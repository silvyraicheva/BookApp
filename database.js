import * as SQLite from "expo-sqlite";

const db = SQLite.openDatabase("books.db");

// const setupDatabase = () => {
//     db.transaction((tx) => {
//         tx.executeSql(
//             "CREATE TABLE IF NOT EXISTS books (id INTEGER PRIMARY KEY AUTOINCREMENT, title TEXT, author TEXT, start_date TEXT, end_date TEXT)",
//             [],
//             () => console.log("Table created successfully"),
//             (error) => console.error("Error creating table: ", error)
//         );
//     });
// };
const setupDatabase = () => {
    db.transaction((tx) => {
        tx.executeSql(
            `CREATE TABLE IF NOT EXISTS books1 (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                title TEXT,
                author TEXT,
                start_date TEXT,
                end_date TEXT,
                image BLOB 
            );
            `,
            [],
            () => console.log("Table created successfully"),
            (error) => console.error("Error creating table: ", error)
        );
    });
};
const insertBook = (title, author, startDate, endDate, image) => {
    db.transaction((tx) => {
        tx.executeSql(
            "INSERT INTO books1 (title, author, start_date, end_date, image) VALUES (?, ?, ?, ?, ?)",
            [title, author, startDate, endDate, image], // Assuming 'image' is already properly formatted for insertion
            () => console.log("Book inserted successfully"),
            (error) => console.error("Error inserting book: ", error)
        );
    });
};
// const insertBook = (title, author, startDate, endDate) => {
//     db.transaction((tx) => {
//         tx.executeSql(
//             "INSERT INTO books (title, author, start_date, end_date) VALUES (?, ?, ?, ?)",
//             [title, author, startDate, endDate],
//             () => console.log("Book inserted successfully"),
//             (error) => console.error("Error inserting book: ", error)
//         );
//     });
// };
// const clearBooksDatabase = () => {
//     db.transaction(
//         (tx) => {
//             // Execute the SQL query to delete all records from the books table
//             tx.executeSql("DELETE FROM books;", [], (_, result) => {
//                 console.log("Books database cleared.");
//                 // Update the state to remove all books
//                 setBooks([]);
//             });
//         },
//         (error) => {
//             console.error("Error clearing books database:", error);
//         }
//     );
// };

const getAllBooks = (callback) => {
    db.transaction((tx) => {
        tx.executeSql(
            "SELECT * FROM books1",
            [],
            (_, { rows }) => {
                const books = rows._array.map((book) => ({
                    ...book,
                    // Assuming 'image' is stored in the database in a format compatible with the Image component in React Native
                }));
                callback(books);
            },
            (error) => console.error("Error fetching books: ", error)
        );
    });
};
const clearBooksDatabase = () => {
    db.transaction(
        (tx) => {
            // Execute the SQL query to delete all records from the books1 table
            tx.executeSql("DELETE FROM books1", [], (_, result) => {
                console.log("Books database cleared.");
            });
        },
        (error) => {
            console.error("Error clearing books database:", error);
        }
    );
};

export { setupDatabase, insertBook, getAllBooks, clearBooksDatabase };
