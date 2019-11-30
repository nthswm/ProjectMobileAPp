import * as SQLite from 'expo-sqlite';
const db = SQLite.openDatabase("db.db");
class Databasesq{

  constructor() {
    db.transaction(tx => {
      tx.executeSql(
        "create table if not exists items (id integer primary key not null, done int, value text);"
      );
    });
  }

  putText(text,success_callback,fail_callback){
    db.transaction(
      tx => {
        tx.executeSql("insert into items (done, value) values (0, ?)", [text], (_, {insertId})=>success_callback(insertId),fail_callback());
      },
      null,
    );
  
  }
  getAllText(success_callback,fail_callback)
  {
    db.transaction(
      tx => {
        tx.executeSql("select * from items", [], (_, { rows:{_array} }) => success_callback(_array),fail_callback());
      },
      null,
    );
  }

  deleteAll()
  {
    db.transaction(
      tx => {
        tx.executeSql("delete from items");
      },
    );
  }
}

const databasesq = new Databasesq();
export default databasesq;