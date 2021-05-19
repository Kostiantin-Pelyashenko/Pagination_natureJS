const news = document.querySelectorAll('.new'); // iteration list of items
const itms = 5; // number of items for one page
const pages = Math.ceil(news.length / itms); // number of pages (5 items on one page)
const pagination = document.querySelector('.pagination');
// first page
for (let i = 0; i < itms; i++) {
  news[i].style.display = 'block';
}

// list of buttons
let page_list =
  '<button type="button" class="btn btn-success m-1" id = "prev" disabled> << </button>';
for (let i = 0; i < pages; i++) {
  page_list +=
    '<button id="page' +
    (i + 1) +
    '" type="button" class="btn btn-success m-1">' +
    (i + 1) +
    '</button>';
}
page_list +=
  '<button type="button" class="btn btn-success m-1" id = "next"> >> </button>';
pagination.innerHTML = page_list;

const btn = document.querySelectorAll('.btn');
let active_page = document.getElementById('page1');
active_page.classList.add('btn-warning');

// eventListener for buttons
[...btn].forEach((item) => {
  item.addEventListener('click', function (event) {
    let num = (this.innerHTML - 1) * itms; // first item current page
    const id = event.target.id;
    const prev_page = document.getElementsByClassName('btn-warning'); // previous page
    for (let i = 0; i < news.length; i++) {
      news[i].style.display = 'none';
    }

    if (id == 'next') {
      num = prev_page[0].innerHTML * itms; // first item current page for next button
      const n = prev_page[0].innerHTML * 1 + 1; // current page number for active
      for (let i = num; i < num + itms; i++) {
        news[i].style.display = 'block';
        if (i >= news.length - 1) {
          document.getElementById('next').disabled = true;
          break;
        }
        document.getElementById('next').disabled = false;
        document.getElementById('prev').disabled = false;
      }
      btn[n].classList.add('btn-warning');
      prev_page[0].classList.remove('btn-warning');
    } else if (id == 'prev') {
      num = prev_page[0].innerHTML * itms - itms * 2; // first item current page for prev button
      const n = prev_page[0].innerHTML - 1; // current page number for active
      for (let i = num; i < num + itms; i++) {
        if (i <= 0) {
          document.getElementById('prev').disabled = true;
        }
        news[i].style.display = 'block';
        document.getElementById('next').disabled = false;
      }
      btn[n].classList.add('btn-warning');
      prev_page[1].classList.remove('btn-warning');
    } else {
      for (i = 0; i < btn.length; i++) {
        btn[i].classList.remove('btn-warning');
      }
      for (let i = num; i < num + itms; i++) {
        news[i].style.display = 'block';
        if (i >= news.length - 1) {
          document.getElementById('next').disabled = true;
          document.getElementById('prev').disabled = false;
          break;
        }
        document.getElementById('next').disabled = false;
        document.getElementById('prev').disabled = false;
      }
      active_page = document.getElementById(id);
      active_page.classList.add('btn-warning');
      if (this.id == 'page1') {
        document.getElementById('prev').disabled = true;
      }
    }
  });
});
