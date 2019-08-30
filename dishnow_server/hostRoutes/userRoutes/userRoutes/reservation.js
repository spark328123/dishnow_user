var express = require('express');
var router = express.Router();
var auth = require('../auth')
var mysql = require('../mysql');
var onesignal = require('../hostRoutes/onesignal')

module.exports = router;

router.post('/',auth, async (req, res) => {

    var storeTypeId = req.body.storeTypeId;
    var peopleNumber = req.body.peopleNumber;
    var minutes = req.body.minutes;
    var latitude = req.body.latitude;
    var longitude = req.body.longitude;
    var userId = req.auth.userId;

    if(!storeTypeId || !peopleNumber || !minutes || !latitude || !longitude)
        return res.status(400).end();

    try{

        var select = 'SELECT name FROM user WHERE userId = ?'
        var name = await mysql.do(select,[userId]);

        var select = 'SELECT storeId,pushToken FROM store JOIN host ON(store.hostId = host.hostId) '+
                     'WHERE storeTypeId = ? AND isCall ="true" AND ST_Distance_Sphere(POINT(longitude,latitude), POINT(?,?)) < 200' // m
        var storeResult = await mysql.do(select,[storeTypeId,longitude,latitude]);

        var createdAt = new Date();
        var time = new Date(createdAt.getTime);
        time.setTime(createdAt.getTime() + (minutes*60*1000));

        for(var i =0; i<storeResult.length;i++){
            var insert = 'INSERT INTO reservation (userId,storeId,peopleNumber,time,state,createdAt) VALUE (?,?,?,?,?,?)'
            var insertResult = await mysql.do(insert,[userId,storeResult[i].storeId,peopleNumber,time,'request',createdAt])
		storeResult[i].createdAt = createdAt
            //사장님에게 전송.
            onesignal.pushTarget('예약 요청이 왔습니다.',[storeResult[i].pushToken],{reservationId : insertResult.insertId,
                                                               time : time,
                                                               createdAt :createdAt,
                                                               peopleNumber : peopleNumber,
                                                               name : name[0].name,
                                                               type : 'request'
                                                              });
        }
        return res.json(createdAt);
    }
    catch(e){
        return res.status(400).json({message: '잠시 후 다시 시도해주세요.'});
    }

});

router.get('/accept',auth,async (req, res) => {

    var userId = req.auth.userId;

    try{
        
        var selectRow = ['reservationId', 'reservation.storeId', 'store.name', 'store.mainImage', 'store.latitude', 'store.longitude', 'storeType.type']
        var select = 'SELECT ?? FROM reservation '+
                     'JOIN store ON (store.storeId=reservation.storeId) JOIN storeType ON (storeType.storeTypeId = store.storeTypeId) '+
                     'WHERE userId = ? AND reservation.state = "accept" '
        var result = await mysql.do(select,[selectRow,userId]);

        return res.json(result);
    }
    catch(e){
        return res.status(400).json({message: '잠시 후 다시 시도해주세요.'});
    }

});

router.put('/confirm',auth,async (req, res) => {

    var reservationId = req.body.reservationId;
    var storeId = req.body.storeId;

    if(!reservationId || !storeId)
        return res.status(400).end();

    try{
        var update = 'UPDATE reservation SET state = "confirm" WHERE reservationId = ? AND storeId = ?'
        await mysql.do(update,[reservationId,storeId]);

        var selectRow = ['reservationId','reservation.time','reservation.createdAt','peopleNumber','user.name','user.phone','host.pushToken']

        var select = 'SELECT ?? FROM reservation ' +
                     'JOIN user ON (reservation.userId = user.userId ) '+
                     'JOIN store ON (reservation.storeId = store.storeId) '+
                     'JOIN host ON (store.hostId = host.hostId ) ' +
                     'WHERE reservationId =? AND reservation.storeId = ? AND state = "confirm" ' 

        var result = await mysql.do(select,[selectRow,reservationId,storeId]);

        //사장님에게 전송
        onesignal.pushTarget('예약이 완료되었습니다.',[result[0].pushToken],
                                            {    reservationId : result[0].reservationId,
                                                 time : result[0].time,
                                                 createdAt : result[0].createdAt,
                                                 peopleNumber : result[0].peopleNumber,
                                                 name : result[0].name,
                                                 phone : result[0].phone,
                                                 type : 'confirm'
                                            });

        return res.end();
    }
    catch(e){
        return res.status(400).json({message: '잠시 후 다시 시도해주세요.'});
    }

});

router.put('/cancel',auth,async(req,res) => {
	var userId = req.auth.userId;

	try{
		var update = 'UPDATE user SET isCall = "false" WHERE userId = ? ';
		await mysql.do(update,[userId]);
		return res.end();
	}
	catch(e){
		return res.status(400).json({message : '잠시 후 다시 시도해주세요.'});
	}
});

router.put('/revert',auth,async(req,res) => {
        var userId = req.auth.userId;

        try{
                var update = 'UPDATE user SET isCall = "true" WHERE userId = ? ';
                await mysql.do(update,[userId]);
                return res.end();
        }
        catch(e){
                return res.status(400).json({message : '잠시 후 다시 시도해주세요.'});
        }
});

