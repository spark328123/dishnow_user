import React from 'react'
import {Alert} from 'react-native'
import Dialog from 'react-native-dialog'
export default () => {
    <Dialog.Container visible = {visible}>
        <Dialog.Title>로그아웃</Dialog.Title>
        <Dialog.Description>
            로그아웃 하시겠습니까?
        </Dialog.Description>
        <Dialog.Button 
            label="취소"
            onPress = {()=>setVisible(false)} 
        />
        <Dialog.Button 
            label="삭제"
            onPress = {()=>{setVisible(false);_deleteSource(item.id)}} 
        />
                
    </Dialog.Container>
} 