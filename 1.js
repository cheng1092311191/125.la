const https=require("https")
   
let h=setInterval(async () => {
    var options={
        host:'bbs.125.la',
        path:'/thread-14597390-1-1.html',
        method:"GET",
        headers:{
            cookie:"lDlk_ecc9_saltkey=vrRZbR5w; lDlk_ecc9_lastvisit=1593704431; lDlk_ecc9_client_created=1593708036; lDlk_ecc9_client_token=4F0ACFA1FAAB922A5B922D43EAE7DFEE; lDlk_ecc9_auth=647byzPJZsjEfMx7zgZ5vqR%2BeuaAdU6Bw%2F%2FZZ7bJbCGYeLvP1j8krPYqKuz4leTpUYkrhFRePuTmNN8loJWUAgWxJA; lDlk_ecc9_connect_login=1; lDlk_ecc9_connect_is_bind=1; lDlk_ecc9_connect_uin=4F0ACFA1FAAB922A5B922D43EAE7DFEE; lDlk_ecc9_nofavfid=1; lDlk_ecc9_smile=4D1; lDlk_ecc9_forum_lastvisit=D_27_1594297346; lDlk_ecc9_myrepeat_rr=R0; lDlk_ecc9_sid=yc6SSL; lDlk_ecc9_lip=58.209.142.5%2C1594383864; lDlk_ecc9_connect_last_report_time=2020-07-11; lDlk_ecc9_ulastactivity=6e987Hk%2Fo1XZ6g%2FEmosRDJtCvzxBQeQPBNxXRiigI989uufuSmLt; Hm_lvt_fa32dadde3745af309b587b38d20ea1d=1594293871,1594295569,1594384309,1594461952; PHPSESSID=jk09cc9cs8nfcslmdit9907f45; lDlk_ecc9_viewid=tid_14597390; lDlk_ecc9_connect_sync_post=14597390%7C19199969; lDlk_ecc9_sendmail=1; lDlk_ecc9_lastcheckfeed=86382%7C1594464385; lDlk_ecc9_checkfollow=1; lDlk_ecc9_checkpm=1; lDlk_ecc9_st_p=86382%7C1594464390%7Cc120ec37fada6b6b0894d207459486eb; lDlk_ecc9_lastact=1594464392%09connect.php%09check; Hm_lpvt_fa32dadde3745af309b587b38d20ea1d=1594464395"
        }
    }
    var result =await sendRequest(options);
    console.log(result)
}, 2000);
function sendRequest(opt){
   return  new  Promise((reject,resolve)=>{
        const req=https.request(opt,(res)=>{
            var bat=Buffer.from('')
            res.on('data',(d)=>{
                bat+=d;
            })
            res.on('end',e=>{
                var  reg=/em>(\d+)<\/em/g;
                var str=bat.toString()
                reject(str.match(reg)) 
            })
        })
        req.on('error',e=>{
            resolve(e);
        })
        req.end()
    }).catch(e=>{
        console.error(e);
        clearInterval(h);
    })
}
console.log(h);






