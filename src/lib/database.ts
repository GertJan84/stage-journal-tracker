import { Surreal } from 'surrealdb.js';

export const getSurrealClient = async () => {
    const db: Surreal = new Surreal();

    try {
        await db.connect("http://127.0.0.1:8000/rpc", {
            namespace: "journal" ,
            database: "journal",

            //auth: {
            //    username: "root",
            //    password: "root",
            //}
        })

    } catch (e) {
        console.log("Error", e)
    }


//    const events = await db.select("event")

//    console.log(events[0])

    return db;
}
export const createEvent = async (db: any) => {
        return await db.create("event", {

            name: "test1",
            startDate: new Date().toLocaleString(),

            extended: 1,
            expectedMinute: 30,
            difficoultie: 2,
            comment: "This is a test"
        })
}
