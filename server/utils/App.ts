import * as jsreport from 'jsreport';
import * as path from 'path';
import * as fs from 'fs';
import * as jwt from 'jsonwebtoken';
import { Transport, createTransport } from 'nodemailer';

export class App {
    private static uniqueId: number = 0;
    public static TOKEN_MESSAGE = 'Please enter the token.';
    public static SAVED_SUCCESSFULLY = 'Saved Successfully.';
    public static REMOVED_SUCCESSFULLY = 'Removed Successfully.';
    public static INVALID_DATA = 'Please enter valid data.';
    
    public static UniqueNumber(): string {
        var time: number = new Date().getTime();
        if (this.uniqueId == time) {
            while (new Date().getTime() < 1 + time) { ; }
            time = new Date().getTime();;
        }
        this.uniqueId = time;
        return time.toString(36).toUpperCase();
    }

    public static Send(req, res, promise) {
        var respObj: any = {};
        promise.then(data => {
            respObj.status = 1;
            respObj.data = data;
            res.jsonp(respObj);
        }).catch(err => {
            console.log(err);
            respObj.status = 0;
            respObj.error = err;
            res.jsonp(respObj);
        });
    }

    public static Print(template, res, promise) {
       

        promise.then( data => {
            template = path.join(__dirname,'/../../docs/templates/'+template+".html");
            template = fs.readFileSync(template, "utf8");
            data = JSON.parse(JSON.stringify(data));
            //console.log(data.data);
            jsreport.render({
                template: {
                    engine: "handlebars",
                    content: template,
                    recipe: "html"
                },
                data: data.data
            }).then(out => {
                console.log(out.stream);
                out.stream.pipe(res);
            }).catch(err => {
                var respObj: any = {};
                console.log(err);
                respObj.status = 0;
                respObj.error = err;
                res.jsonp(respObj);
            });
        }).catch( err => {
            var respObj: any = {};
            console.log(err);
            respObj.status = 0;
            respObj.error = err;
            res.jsonp(respObj);
        });
    }

    public static encodeJWT(data: any) {
        return jwt.sign(data, 'SwanInfo' );;
    }
    public  static decodeJWT(token: any) {
        if(token) {
            try {
                return jwt.verify(token, 'SwanInfo');
            } catch(err) {
                return err;
            }           
        } else {
            return null;
        }
    }
    
    public  static  createEmailAccount() {
       return createTransport({
            host: 'smtp.gmail.com',
            port: 465,
            secure: true,
            requireTLS: true,
            auth: {
                user: 'elit.naveen@gmail.com',
                pass: 'kddintepfsnefnrw'
            }
          });
    }
    public static CheckSessionInfo(data: any) {
        if(data) {
            if(data.name  && data.message && data.name.lowercase().indexOf('error') > -1){
                return false;
            } else {
                return true;
            }
        } else {
            return false;
        }
    }
    public static DaysBack(date: Date, days: number) {
        date = new Date(date);
        date.setDate(date.getDate() - days);
        date = new Date(date.getFullYear(), date.getMonth(), date.getDate());
        return date;
    }

    public static DaysDiff(d1: Date, d2: Date): number {
        var t2: number = d2.getTime();
        var t1: number = d1.getTime();
        let diff: any = (t2 - t1) / (24 * 3600 * 1000);
        return parseInt(diff);
    }
}
