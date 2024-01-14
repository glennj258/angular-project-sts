import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { from, mergeMap, Observable } from 'rxjs';
import { GetObjectCommand, S3Client } from "@aws-sdk/client-s3";
import { Subject } from 'rxjs';


// snippet-end:[s3.JavaScript.buckets.getobjectV3]

// Invoke main function if this file was run directly.
// if (process.argv[1] === Url(import.meta.url)) {
//   main();
// }

@Injectable({
  providedIn: 'root'
})
export class HonoursDataService {
  // emissions and economic results
  private ee_results_csv_URL = "https://sts-mode-increase-results.s3.ap-southeast-2.amazonaws.com/totals_ee_json.json"
  
  
  //private s3 = new S3();
  private bucketName = 'sts-mode-increase-results';
  private objectKey = 'Totals_emissions_economics.csv';

  // Create a subject to track the development scenario
  private dsSubject = new Subject<string>();
  // Observable to which components can subscribe
  dsChanged$ = this.dsSubject.asObservable();

  // Variable to be observed
  private currentDevScen = 'actual';


  constructor(private http: HttpClient) { }

  getEeResultsDataCSV(): Observable<any> {
    return this.http.get<any>(this.ee_results_csv_URL);
  }

  getEeResultsLocal(): Observable<any> {
    return this.http.get('/assets/data/Totals_emissions_economics.json')
  }


  
  // Function to update the variable and notify subscribers
  updateVariable(newDS: string) {
    this.currentDevScen = newDS;
    // Notify subscribers that the variable has changed
    this.dsSubject.next(this.currentDevScen);
  }

  // Getter to access the current develoopment scenario
  getVariableValue(): string {
    return this.currentDevScen;
  }

  //   // const response = await client.send(command);
  //   async () => {
  //     const command = new GetObjectCommand({
  //       Bucket: "test-bucket",
  //       Key: "hello-s3.txt",
  //     });
    
  //     try {
  //       const response = await client.send(command);
  //       // The Body object also has 'transformToByteArray' and 'transformToWebStream' methods.
  //       if (response.Body){
  //         const str = await response.Body.transformToString();
  //         console.log(str);
  //       }
  //     } catch (err) {
  //       console.error(err);
  //     }
  //   };
  //   return str
  // }
}
