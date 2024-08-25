var count = 0
export function reducer(books, action) {
    switch (action.type) {
        case "ADD":
            return [...books, { ...action.payload, id: count++ }];
        case "DELETE":
            return books.filter(book => book.id != action.id);
    }
}