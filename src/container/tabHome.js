import React, {useState,useEffect} from 'react';
import { View, 
    StyleSheet, 
    AppRegistry, 
    ScrollView, 
    TouchableOpacity, 
    TextInput, 
    Image, 
    KeyboardAvoidingView, 
    Keyboard, 
    TouchableWithoutFeedback,
    ActivityIndicator,
    
} from 'react-native';
import GoogleMap from '../utill/googlemap.js';
import { useDispatch, connect } from 'react-redux';
import * as API from '../utill/API';
import * as Utill from '../utill';
import  * as User from '../store/modules/user'
import ModalDropdown from 'react-native-modal-dropdown';
import { BigButtonColor, Text, CustomAlert, CustomAlert1 } from '../component/common'
import OneSignal from 'react-native-onesignal';
import Toast from 'react-native-simple-toast';

const TabHome = (props)=>{
    const dispatch = useDispatch();
    const [isLoaded, setIsLoaded] = useState(true);
    const [touch,setTouch] = useState(false);
    const [tabtimer, setTabtimer] = useState();

    const _me = async() => {
        setTabtimer(API.getTimer(await API.TAB_TIMER));
        const token = await API.getLocal(API.LOCALKEY_TOKEN);
        const meRes = await API.me(token);
        if(meRes.error){
            Toast.show('네트워크 연결 상태를 확인해 주세요');
            return;
        }
        const userid = meRes.userId;
        const point = meRes.point;
        const name = meRes.name;
        const phone = meRes.phone;
        const image = meRes.image;
        const reviewcount = meRes.reviewCount;
        const nickname = meRes.nickname;
        dispatch(User.updateuserid(userid));
        dispatch(User.updatepoint(point));
        dispatch(User.upadtename(name));
        dispatch(User.updatephone(phone));
        dispatch(User.updateimage(image));
        dispatch(User.updatereviewcount(reviewcount));
        dispatch(User.updatenickname(nickname));
        const pushToken = await API.getPush(API.PUSH_TOKEN);
        await API.setPushToken(token,{pushToken});
        setIsLoaded(false);
    }

    const [people, setPeople] = useState('');
    const [time, setTime] = useState('');
    const [tema, setTema] = useState(0);
    const [bol, setBol] = useState(true);
    const [arr, setArr] = useState(
        ['3', '5', '10', '15', '20']
    );

    const {navigation, latitude, longitude, address} = props;

    const [isAlertVisible, setIsAlertVisible] = useState(false);
    const [isAlertVisible2, setIsAlertVisible2] = useState(false);

    const _onPressAlertCancel = async() => {
        setIsAlertVisible(false);
    }

    const _onPressAlertOk = async() => {
        setIsAlertVisible2(false); 
    }

    useEffect(()=>{
        OneSignal.addEventListener('ids',onIds);
        setTabtimer(API.getTimer(API.TAB_TIMER));
        _me();
        return () => {
            OneSignal.removeEventListener('ids',onIds);
        }
    },[]);

    const _reservation = async()=>{

        if(touch)return;
        setTouch(true);
        setTimeout(()=>{
            setTouch(false);
        },500)

        // const readytime = await API.getTimer(API.TAB_TIMER);
        // console.log("ready time : " + readytime);
        // const tabtimer = (new Date()).getTime();
        // console.log("tabtimer : " + tabtimer);
        const nowtime = (new Date()).getTime();
        console.log("tabtimer");
        console.log(parseInt(tabtimer._55));
        console.log("nowtime");
        console.log(nowtime);
        var twomin = (nowtime - parseInt(tabtimer._55))/1000/60;
        console.log(twomin);

        if(twomin>2){
            await API.setTimer(API.TAB_TIMER, JSON.stringify(new Date().getTime()));
            const token = await API.getLocal(API.LOCALKEY_TOKEN);
            await API.reservation_revert(token);
            const data = {
                storeTypeId : tema + 1,
                peopleNumber : parseInt(people.text),
                minutes : parseInt(arr[parseInt(time)]),
                latitude,
                longitude, 
            }
            const res = await API.reservation(token,data);

            // console.log("if문의 tabtimer : " + tabtimer);
            // await API.setTimer(API.TAB_TIMER, tabtimer.toString);
            // console.log("api tab_timer : " + API.getTimer(API.TAB_TIMER));

            navigation.navigate('onWait',{
                people : people.text,
                time : arr[parseInt(time)],
                tema : temaList[tema].id,
                address,
                createdAt : `${res.substring(0,10)} ${res.substring(11,19)}`,
            });
        }
        else{
            setIsAlertVisible(false);
            setIsAlertVisible2(true);
        }
        setIsAlertVisible(false);
    }

    const onIds = ((device) => {
        let token = device.userId;
        API.setPush(API.PUSH_TOKEN,token);
      })

    const [temaList, settemaList] = useState([  // 테마배열
        {   color : '#111111', isselect : false, id : '전체',},
        {   color : '#111111', isselect : false, id : '단체',},
        {   color : '#111111', isselect : false, id : '가성비',},
        {   color : '#111111', isselect : false, id : '데이트',},
        {   color : '#111111', isselect : false, id : '밥&술',},
        {   color : '#111111', isselect : false, id : '이자카야',},
    ]);

    const _toggle = async(i,newTemaList) =>{ // 색깔바뀌는 함수 밖으로 빼냄
        await _selectTema(i);                // ***tema 동기화 잘안됨!
        for(let k=0; k<6; k++){
            if(i!==k){
                newTemaList[k].color = '#111111';
                newTemaList[k].isselect = false;
            }
        }
        newTemaList[i].color = '#733FFF';
        newTemaList[i].isselect = true;
    }

    const _changeTemaColor = async(i) => {  // 테마선택 색깔,선택 바뀌게하는 함수
        let newTemaList = [...temaList];
        if(newTemaList[i].color === '#111111'){
          await _toggle(i,newTemaList);
        }else{
            newTemaList[i].color = '#111111';
            newTemaList[i].isselect = false;
        }
        settemaList(newTemaList);
    }

    const _selectTema = (i) =>{
        setTema(i);
    }

    const _selectTime = (rowData) =>{
        setTime(rowData);
        setBol(false);
    }
    
   
    return(
        <View style = {{flex : 1}}>
             <CustomAlert
                visible={isAlertVisible} 
                mainTitle={'요청 안내'}
                mainTextStyle = {styles.txtStyle}
                subTitle = {'요청을 보내게 되면 500m 내 전체 술집에 알람이 가게 됩니다. 실시간 예약 가능 여부를 물으시겠습니까?'}
                subTextStyle = {styles.subtxtStyle}
                buttonText1={'아니오'}
                buttonText2={'네'} 
                onPress={_reservation} 
                onPressCancel = {_onPressAlertCancel}
            />
            <CustomAlert1
                visible={isAlertVisible2} 
                mainTitle={'요청 안내'}
                mainTextStyle = {styles.txtStyle}
                subTitle = {'콜은 2분에 한번만 가능합니다.'}
                subTextStyle = {styles.subtxtStyle}
                buttonText1 = {'확인'}
                onPress={_onPressAlertOk}
            />
            {!isLoaded?(
                <KeyboardAvoidingView style={styles.container} behavior= "height" enabled>
                 <View style = {styles.map}>
            <GoogleMap
               isPressed = { false }
               navigation = { navigation }   
               latitudeDelta = {0.0125}
               toggle  = {()=>{navigation.navigate('Departure')}}>
            </GoogleMap>
            </View>
            <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={true}>
            <View style = {styles.input}>
            <ScrollView
                    style = {styles.scrollViewContainer}
                    horizontal = {true}
                    showsVerticalScrollIndicator = {true}
                    contentContainerStyle={{
                        flexGrow: 1,
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        marginLeft: 16
                    }}
                    >
                        <View style = {styles.item}>
                        <TouchableOpacity onPress = {()=>_changeTemaColor(0)}>
                            <View style = {styles.item}><Text  style = {{color : temaList[0].color }}> 전체 </Text></View>
                        </TouchableOpacity>
                        </View>
                        <View style = {styles.item}>
                        <TouchableOpacity onPress = {()=>_changeTemaColor(1)}>
                            <View style = {styles.item}><Text  style = {{color : temaList[1].color }}> 단체 </Text></View>
                        </TouchableOpacity>
                        </View>
                        <View style = {styles.item}>
                        <TouchableOpacity onPress = {()=>_changeTemaColor(2)}>
                            <View style = {styles.item}><Text  style = {{color : temaList[2].color }}> 가성비 </Text></View>
                        </TouchableOpacity>
                        </View>
                        <View style = {styles.item}>
                        <TouchableOpacity onPress = {()=>_changeTemaColor(3)}>
                            <View style = {styles.item}><Text  style = {{color : temaList[3].color }}> 데이트 </Text></View>
                        </TouchableOpacity>
                        </View>
                        <View style = {styles.item}>
                        <TouchableOpacity onPress = {()=>_changeTemaColor(4)}>
                            <View style = {styles.item}><Text  style = {{color : temaList[4].color }}> {`밥&술`} </Text></View>
                        </TouchableOpacity>
                        </View>
                        <View style = {styles.item}>
                        <TouchableOpacity onPress = {()=>_changeTemaColor(5)}>
                            <View style = {styles.item}><Text  style = {{color : temaList[5].color }}> 이자카야 </Text></View>
                        </TouchableOpacity>
                        </View>
                        <View style = {{width : 50 }}>

                        </View>
                </ScrollView>

                <View style={[styles.parent, {height: Utill.screen.Screen.customHomeHeight(172)}]} horizontal = {true}>

               
                <View style={styles.content}>
                    <View style={{alignItems : 'flex-start', marginTop : 1}}>
                        <View style={styles.childchild1}><Text style = {styles.tst}>인원</Text></View>
                        <View style = {styles.childchild2}>
                            <TextInput 
                            maxLength={2}
                            blurOnSubmit = {true}
                            keyboardType = 'number-pad'
                            selectionColor = '#733FFF'
                            placeholder ={'00'}
                            placeholderTextColor = {'#CCCCCC'}
                            onChangeText={(text) => setPeople({text})}
                            value={people.text}
                            style={styles.personInput} />
                            <Text style={{fontSize : 24, marginBottom: 5, color: "#111111"}}> 명</Text>
                        </View>
                    </View>
                    <View style={styles.child}>
                        <View style={styles.childchild1}><Text style = {styles.tst}>출발 예정 시간</Text></View>
                        <View style = {styles.childchild2}>
                            <View style={styles.dropdown}>
                                {bol&&(<ModalDropdown
                                defaultValue = {0} 
                                textStyle = {{fontSize: 24, fontFamily: "NanumSquareOTFR", color: '#CCCCCC', marginTop : -2}}
                                dropdownTextStyle = {{fontSize: 16, fontFamily: "NanumSquareOTFR", color: "#111111"}}
                                style = {{width : 33, height : 31}} 
                                options = {['3', '5', '10', '15', '20']}
                                onDropdownWillShow = {()=>Keyboard.dismiss()}
                                onSelect = {(idx) => _selectTime(idx)}
                                />)}
                                {!bol&&(<ModalDropdown
                                defaultValue = {arr[time]}
                                textStyle = {{fontSize: 24, fontFamily: "NanumSquareOTFR", color: "#111111", marginTop : -2}}
                                dropdownTextStyle = {{fontSize: 16, fontFamily: "NanumSquareOTFR", color: "#111111"}}
                                style = {{width : 33, height : 31}} 
                                options = {['3', '5', '10', '15', '20']}
                                onSelect = {(idx) => _selectTime(idx)}
                                onDropdownWillShow = {()=>Keyboard.dismiss()}
                                />)}
                                <Image style = {{width: 8, height:4.75}} source = {{uri: "icon_rsquare_bracket_under"}}></Image>
                            </View> 
                            <Text style={{fontSize : 24, marginBottom: 5, color: "#111111"}}> 분 후</Text>
                        </View>
                    </View>
                    </View>
               
                </View>
        

            <View style={{alignItems: 'center'}}>
            <BigButtonColor 
                    style={[styles.find, {marginBottom: Utill.screen.Screen.customHeight(52)}]}
                    onPress ={()=> ((tema+1)&&parseInt(people.text)>0&&parseInt(arr[parseInt(time)])>0) ? setIsAlertVisible(true) : Toast.show("테마, 인원, 출발 예정 시간을 확인해주세요.")}
                    title = {'술집 찾기'}
            />
            </View>
            </View>
            </TouchableWithoutFeedback>
             </KeyboardAvoidingView>
            ):(
                <View style={styles.whiteOverlay}>
                    <ActivityIndicator style={styles.indicator} size="large" color={"#733FFF"} />
                </View>
            )}
       </View>
    )
}


const mapStateToProps = (state) => {
    
    return {
        
        latitude : state.Maps._root.entries[0][1].latitude,
        longitude : state.Maps._root.entries[0][1].longitude,
        address : state.Maps._root.entries[1][1],
    }
}

export default connect(mapStateToProps)(TabHome);

const styles = StyleSheet.create({
    container : {                       // 화면전체
        flex : 1
    },
    map : {                             // 지도부분을 의미
        width : "100%",
        height : "40%",
    },
    scrollViewContainer :{
        height: 46,
        width: '100%',
        marginTop: Utill.screen.Screen.customHeight(30),
        backgroundColor: "#EEEEEE",
    },
    scrollTheme: {
        height: 46,
        alignItems: 'center',
        width: 471,
        flexDirection: 'row',
        backgroundColor: "#EEEEEE",
        justifyContent: "space-around"
    },
    tst : {
        fontSize : 14,
        textAlign : 'center',
    },
    item : {                            // 테마 스크롤의 각각 아이템
        width : 80,
        alignItems : 'center',
    },
    parent : {                          // 연두색 배경
        height: Utill.screen.Screen.customHeight(172),
        flexDirection : 'row',
        justifyContent: "center",
        alignItems: 'center'
    },
    content : {
        flexDirection: "row",
        width: Utill.screen.Screen.customWidth(262),
        justifyContent: "space-around"
    },
    child : {                           // 연두색 배경 왼쪽, 오른쪽 반반씩을 의미
        alignItems : 'flex-start',
    },
    personInput: {
        fontSize : 24,
        borderBottomWidth: 3,
        borderColor: "#733FFF",
        width: 43,
        height: 31,
        fontFamily: "NanumSquareOTFR",
        padding: 0,
        marginBottom: 2,
        borderWidth: 0, 
    },
    childchild1 : {
        marginBottom: Utill.screen.Screen.customHeight(15)    // 인원, 출발 예정 시간 (제목임)
    },
    dropdown :{
        width: 42,
        height: 31,
        flexDirection: 'row',
        alignItems: "center",
        borderBottomWidth: 3,
        borderColor: "#733FFF",
        marginBottom : 2,
    },
    childchild2 : {
        flexDirection : 'row',
        justifyContent: "flex-end",
        alignItems: "flex-end",
    },
    find : {                             // 식당찾기
    },
    textinput : {                         // 00 부분

    },
    whiteOverlay: {
        width: Utill.screen.screenWidth,
        height: Utill.screen.screenHeight,  
        backgroundColor: 'white',
        position: 'absolute',     
        zIndex: 20        
    },
    indicator: {
        position: 'absolute',
        left: Utill.screen.screenWidth/2-15,
        top: Utill.screen.screenHeight/2-50        
    },
    txtStyle : {
        marginBottom : Utill.screen.Screen.customHeight(9),
        fontSize : 18,
        fontWeight : 'bold',
        color : Utill.color.red,
        alignSelf : 'center',
    },
    subtxtStyle : {
        width : 300,
        marginBottom : Utill.screen.Screen.customHeight(35),
        fontSize : 16,
        color : Utill.color.textBlack,
        textAlign : 'center',
    },
})