class DBConn {
    private static instance: DBConn;

    private constructor() { }
    static getInstance(): DBConn {
        if (!DBConn.instance) {
            DBConn.instance = new DBConn()
        }
        return DBConn.instance
    }
}


const conn1 = DBConn.getInstance()