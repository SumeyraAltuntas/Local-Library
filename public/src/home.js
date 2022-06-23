function getTotalBooksCount(books) {
  return books.length;
}

function getTotalAccountsCount(accounts) {
  return accounts.length
}

function getBooksBorrowedCount(books) {
 return books.filter( book => book.borrows
                     
                    .filter( borrowed => !borrowed.returned)//borrowed book array
                     .length>0).length; 
}

function getMostCommonGenres(books) {
  
const fin = Object.entries(books.map(s => s.genre).reduce((acc, cur) => {
  if (!acc[cur]) {
    acc[cur] = 0;
  }
  acc[cur]++;
  return acc;
}, {})).sort((a, b) => b[1] - a[1]).map(([name, count]) => ({name, count}));

 fin.length = fin.length > 5 ? 5 : fin.length;
  return fin;
}

function getMostPopularBooks(books) {
    let count = 5;
    const borrows = books.map(book=>({name:book.title, count:book.borrows.length}));
    borrows.sort((a,b) => b.count - a.count);
    
    return borrows.slice(0,count);
  
}

function getMostPopularAuthors(books, authors) {
  let total = 5;
   return authors.map(a => {
    a.count = books.filter(b => b.authorId === a.id).reduce((b, a) => b + (a.borrows && a.borrows.length || 0), 0);
    a.name = `${a.name.first} ${a.name.last}`;
    delete a.id;
    return a;
  }).sort((a, b) => b.count - a.count).slice(0, total)
 
}


module.exports = {
  getTotalBooksCount,
  getTotalAccountsCount,
  getBooksBorrowedCount,
  getMostCommonGenres,
  getMostPopularBooks,
  getMostPopularAuthors,
};
