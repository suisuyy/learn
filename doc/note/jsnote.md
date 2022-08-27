function getBookName() {
    let bookName = new URL(location.href).searchParams.get("epub")
    return bookName
}