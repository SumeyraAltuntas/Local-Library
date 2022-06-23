const {
  findAuthorById,
  findBookById,
  partitionBooksByBorrowedStatus,
  getBorrowersForBook,
} = require("./books");

function findAccountById(accounts, id) {
    return accounts.find( account => account.id === id)

}

function sortAccountsByLastName(accounts) {
   return accounts.sort( (acc1, acct2) => acc1.name.last > acct2.name.last? 1 : -1 )

}

function getTotalNumberOfBorrows(account, books) {
     const accId = account.id;
  let total = 0;
  books.forEach(book => book.borrows.forEach(borrow => accId === borrow.id && total++));
  return total;
 
}

function getBooksPossessedByAccount(account, books, authors) {
  return books
    .filter(b => b.borrows[0].id === account.id && !b.borrows[0].returned)
    .map(b => {
    return {
      ...b,
      author: authors.find(a => a.id === b.authorId)
    };
  })
}

module.exports = {
  findAccountById,
  sortAccountsByLastName,
  getTotalNumberOfBorrows,
  getBooksPossessedByAccount,
};
