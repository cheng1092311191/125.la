const https=require("https")
const encoding=require('encoding');
const { type } = require("os");
{
/**验证是否需要验证码
 * get
 * https://bbs.125.la/forum.php?mod=ajax&action=checkpostrule&inajax=yes&ac=reply
 * 
 * response
 * <?xml version="1.0" encoding="gbk"?>
<root><![CDATA[]]></root>
 */


 /**
  * post 
  * ttps://bbs.125.la/forum.php?mod=post&action=reply&fid=27&tid=14597390&extra=page%3D1&replysubmit=yes&infloat=yes&handlekey=fastpost&inajax=1
  * referer: https://bbs.125.la/thread-14597390-1-1.html
  * 
  * body
  * message: %BA%C3%C8%CB%A1%A3%D7%A3%C2%A5%D6%F7%BA%C3%D4%CB%A1%A3%D7%A3%B8%A3
posttime: 1594466428
formhash: b9aed652
usesig: 1
subject: ++
connect_publish_t: 1
  * 
  response 
  <?xml version="1.0" encoding="gbk"?>
<root><![CDATA[<script type="text/javascript" reload="1">if(typeof succeedhandle_fastpost=='function') {succeedhandle_fastpost('forum.php?mod=viewthread&tid=14597390&pid=19200236&page=1&extra=page%3D1#pid19200236', '非常感谢，回复发布成功，现在将转入主题页，请稍候……[ 点击这里转入主题列表 ]', {'fid':'27','tid':'14597390','pid':'19200236','from':'','sechash':''});}</script>]]></root>
  * 
  */
}

// let h=setInterval(async () => {
//     var options={
//         host:'bbs.125.la',
//         path:'/thread-14597390-1-1.html',
//         method:"GET",
//         headers:{
//             cookie:"lDlk_ecc9_saltkey=vrRZbR5w; lDlk_ecc9_lastvisit=1593704431; lDlk_ecc9_client_created=1593708036; lDlk_ecc9_client_token=4F0ACFA1FAAB922A5B922D43EAE7DFEE; lDlk_ecc9_auth=647byzPJZsjEfMx7zgZ5vqR%2BeuaAdU6Bw%2F%2FZZ7bJbCGYeLvP1j8krPYqKuz4leTpUYkrhFRePuTmNN8loJWUAgWxJA; lDlk_ecc9_connect_login=1; lDlk_ecc9_connect_is_bind=1; lDlk_ecc9_connect_uin=4F0ACFA1FAAB922A5B922D43EAE7DFEE; lDlk_ecc9_nofavfid=1; lDlk_ecc9_smile=4D1; lDlk_ecc9_forum_lastvisit=D_27_1594297346; lDlk_ecc9_myrepeat_rr=R0; lDlk_ecc9_sid=yc6SSL; lDlk_ecc9_lip=58.209.142.5%2C1594383864; lDlk_ecc9_connect_last_report_time=2020-07-11; lDlk_ecc9_ulastactivity=6e987Hk%2Fo1XZ6g%2FEmosRDJtCvzxBQeQPBNxXRiigI989uufuSmLt; Hm_lvt_fa32dadde3745af309b587b38d20ea1d=1594293871,1594295569,1594384309,1594461952; PHPSESSID=jk09cc9cs8nfcslmdit9907f45; lDlk_ecc9_viewid=tid_14597390; lDlk_ecc9_connect_sync_post=14597390%7C19199969; lDlk_ecc9_sendmail=1; lDlk_ecc9_lastcheckfeed=86382%7C1594464385; lDlk_ecc9_checkfollow=1; lDlk_ecc9_checkpm=1; lDlk_ecc9_st_p=86382%7C1594464390%7Cc120ec37fada6b6b0894d207459486eb; lDlk_ecc9_lastact=1594464392%09connect.php%09check; Hm_lpvt_fa32dadde3745af309b587b38d20ea1d=1594464395"
//         }
//     }
//     var result =await sendRequest(options);
//     console.log(result)
// }, 2000);



    function getvalue(string,regexp){
        var arr=string.match(regexp);
        return arr?arr[1]:null;
    }

 function Bbs(){
    var formhash='';
    var replyRath='';
    this.options={};
    this.cb;
    this.formhashReg=/"formhash" value="(\w+)" /;
    this.replyReg=/onclick=\"showWindow\('reply', '([\w\W]+&tid=\d+)'\)\" href=\"javascript:;\" title=\"回复\"><img src=\"static\/image\/common\/pn_reply\.png\" alt=\"回复\" \/><\/a>\s+<\/div>\s+<ul/;

    this.sendRequest= function (opt){
        return  new  Promise((reject,resolve)=>{
             const req=https.request(opt,(res)=>{
                 var bat=Buffer.from('')
                 res.on('data',(d)=>{
                    d=encoding.convert(d,'utf-8','gb2312')
                     bat+=d;
                 })
                 res.on('end',e=>{
                     reject(bat);
                 })
             })
             if(opt.method=="POST")req.write(opt.form);           
             req.on('error',e=>{
                 resolve(e);
             })
             req.sete
             req.end()
         }).catch(e=>{
             console.error(e);
         })
     };
    this.setFormhash=function(hash){
        console.log(hash)
        formhash=hash;
    };
    this.getFormhash=function(){
        return formhash;
    };
    this.setReplyPath=function(path){

        replyRath=path;
    };
    this.getReplyPath=function(){
        return replyRath;
    };
};
Bbs.prototype.init=async function(options,errorCB){
    this.options=new Object(options);
    this.options.mthod='GET';
    this.cb=errorCB;
    var replypath='';
    var resule=await this.sendRequest(this.options);
    replypath=getvalue(resule,this.replyReg);
    var error ;
    if(replypath) this.setReplyPath('/'+replypath)
    else  error='get reply path of null ';
    this.cb&&error&&this.cb(error);

};
Bbs.prototype.getFloor=async function(){
    var resule=await this.sendRequest(this.options);
    var formhash=getvalue(resule,this.formhashReg);
    var error;
    if(formhash==null){
        error='error:get formhash of null'
    }else {
        this.setFormhash(formhash);
    };
    var  reg=/em>(\d+)<\/em/;
    var count =getvalue(resule,reg);
    if(count==null){
        error='error:get floor of null';
    } else {
        return count;
    }
    this.cb&&error&&this.cb(error)
    return ;
};
Bbs.prototype.reply=async function(message){
    /**
     * https://bbs.125.la
     * /forum.php?
     * mod=post&action=reply&fid=27&tid=14597390&extra=page%3D1&replysubmit=yes&infloat=yes&handlekey=fastpost&inajax=1
     * 
     *   * body
  * message: %BA%C3%C8%CB%A1%A3%D7%A3%C2%A5%D6%F7%BA%C3%D4%CB%A1%A3%D7%A3%B8%A3
posttime: 1594466428
formhash: b9aed652
usesig: 1
subject: ++
connect_publish_t: 1
     */
    var options =new Object(this.options);
    options.method="POST";
    options.path=this.getReplyPath()+'&extra=page%3D1&replysubmit=yes&infloat=yes&handlekey=fastpost&inajax=1';
    
    // options.form={
    //     message:encodeURIComponent(message),
    //     posttime: Math.floor(new Date().getTime()/1000),
    //     formhash: this.getFormhash(),
    //     usesig: '1',
    //     subject: '++',
    //     connect_publish_t: '1'
    // };
    
    message=encoding.convert(message,'gb2312','utf-8')
    var tempstr='';
    message.map(e=>{
        tempstr+='%'+e.toString(16);
    })
    options.form=`message=${tempstr}&posttime=${Math.floor(new Date().getTime()/1000)}&formhash=${this.getFormhash()}&usesig=1&subject=++&connect_publish_t=1`
    var result =await this.sendRequest(options);
    console.log(result);
    return(result.indexOf('回复发布成功')!=-1);
};

(async function(){
    var la=new Bbs;
    await la.init({
        host:'bbs.125.la',
        path:'/thread-13877472-1-1.html',
        method:"GET",
        headers:{

            'Content-Type': 'application/x-www-form-urlencoded',
            referer:'https://bbs.125.la/thread-13877472-1-1.html',
            cookie:"lDlk_ecc9_saltkey=vrRZbR5w; lDlk_ecc9_lastvisit=1593704431; lDlk_ecc9_client_created=1593708036; lDlk_ecc9_client_token=4F0ACFA1FAAB922A5B922D43EAE7DFEE; lDlk_ecc9_auth=647byzPJZsjEfMx7zgZ5vqR%2BeuaAdU6Bw%2F%2FZZ7bJbCGYeLvP1j8krPYqKuz4leTpUYkrhFRePuTmNN8loJWUAgWxJA; lDlk_ecc9_connect_login=1; lDlk_ecc9_connect_is_bind=1; lDlk_ecc9_connect_uin=4F0ACFA1FAAB922A5B922D43EAE7DFEE; lDlk_ecc9_nofavfid=1; lDlk_ecc9_smile=4D1; lDlk_ecc9_forum_lastvisit=D_27_1594297346; lDlk_ecc9_myrepeat_rr=R0; lDlk_ecc9_sid=yc6SSL; lDlk_ecc9_lip=58.209.142.5%2C1594383864; lDlk_ecc9_connect_last_report_time=2020-07-11; lDlk_ecc9_ulastactivity=6e987Hk%2Fo1XZ6g%2FEmosRDJtCvzxBQeQPBNxXRiigI989uufuSmLt; Hm_lvt_fa32dadde3745af309b587b38d20ea1d=1594293871,1594295569,1594384309,1594461952; PHPSESSID=jk09cc9cs8nfcslmdit9907f45; lDlk_ecc9_viewid=tid_14597390; lDlk_ecc9_connect_sync_post=14597390%7C19199969; lDlk_ecc9_sendmail=1; lDlk_ecc9_lastcheckfeed=86382%7C1594464385; lDlk_ecc9_checkfollow=1; lDlk_ecc9_checkpm=1; lDlk_ecc9_st_p=86382%7C1594464390%7Cc120ec37fada6b6b0894d207459486eb; lDlk_ecc9_lastact=1594464392%09connect.php%09check; Hm_lpvt_fa32dadde3745af309b587b38d20ea1d=1594464395"
        }
    },(er)=>{
        if(er) console.log(er);
    })
    var count = await la.getFloor();
    console.log(count);
    var result =await la.reply("加油加油加油 祝福");
    console.log(result);
    
})();

