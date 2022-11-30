import http, { RequestOptions } from 'https'
import { getConfig } from './helper.util';
import path from 'path'
import { makeDir } from './directory.util';
import fs from 'fs'

/**
 * CURL GET REQUEST
 * @param url 
 * @returns 
 */
export const get = async (url:string) => {
    return new Promise((resolve,reject)=>{

      /**
       * REQUEST OPTIONS
       */
      const options:RequestOptions = {
        host:getConfig('GITLAB_HOST'),
        path:url,
        method:'GET',
        headers:{
          "Accept":"application/json",
          "PRIVATE-TOKEN":getConfig('PERSONAL_ACCESS_TOKEN')
        }
      }


      const req = http.request(options, function(res) {
        const body = [];
        res.setEncoding('utf8');

        res.on('data', function (chunk) {
          body.push(chunk);
        });

        res.on('end', function() {
          try {
              resolve(JSON.parse(body.join('')))
          } catch(e) {
              reject(e);
          }
          resolve(body);
      });
      });

      
      
      req.on('error', function(e) {
        reject(e.message)
      });
      
      // write data to request body
      req.write('data\n');
      req.write('data\n');
      req.end();
    }) 
}


/**
 * 
 * @param url 
 * @param directory 
 * @param filename 
 * @returns 
 */
export const download = async(url:string, directory:string, filename:string) => {
  return new Promise((resolve,reject)=>{
      /** FILE PATH WHERE DATA IS TO BE SAVED */
      const filePath = path.join(makeDir(directory),filename)

      const file = fs.createWriteStream(filePath);
      http.request({
        host:getConfig('GITLAB_HOST'),
        path:url,
        method:'GET',
        headers:{
          "Accept":"application/json",
          "Content-Type": "application/gzip",
          "PRIVATE-TOKEN":getConfig('PERSONAL_ACCESS_TOKEN')
        }
      }, function(response) {
        response.pipe(file);

          // after download completed close filestream
          file.on("finish", () => {
            file.close();
            resolve(filePath)
          });
      });
  })
}