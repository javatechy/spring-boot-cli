/**
 * Common Request for all HTTP calls
 */

export class CustomRequest {
  constructor(public userName?: string, public password?: string, public amount?: number,
              public transactionType?: string, public userId?: string,



              public properties?: Properties, public database?: Database, public logging ?: Logging ,public controllers ?: Controller[]
              , public services ?: Service[]) {
    this.properties = new Properties();
    this.database = new Database();
    this.logging = new Logging();
    this.controllers = new Array();
    this.services = new Array();
  }
}


export class Properties {
  public name  = 'demo';
  public groupId = 'demo';
  public artifactId = 'com.example';
  public description = 'This is a sample Project';
  public applicationClassName?: string;
  public language?: string;
  public developerName = 'Common Man';
  public developerEmailId = 'deepak@test.com';
  public springVersion?: string;
  public isConstantFile = false;
  public isGlobalExceptionEnabled = true;
  public isLombokEnabled = true;
  public isActuatorEnabled = true;
  public isDatabaseEnabled = true;
  public isLoggingEnabled = true;
}


export class Database {
  public isDatabaseEnabled = true;
  public databaseType = 'mysql';
  public userName = 'root';
  public password = '1';

}



export class Logging {
  public loggingFile = 'demo.log';
  public rotationSize = '200MB';


}

export class Entity {
  public name ?: string;
  public fields ?: Field[];
}


export class Field {
  public name ?: string;
  public type ?: string;
  public isUnique ?: boolean;
  public isNullable ?: boolean;
}

export class Controller {
  public name ?: string;
  public docsComment ?: string;
}

export class Service {
  public name ?: string;
  public docsComment ?: string;
}
