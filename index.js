const BaaS = window.BaaS
BaaS.init('69971365ede01a812c8a')
const SectorsMap = {
  "Data & AI": "data-ai-jobs",
  "Web Building": "web-building-jobs",
  "General IT & Project Management": "it-general-pm-jobs",
  "IT Security": "security-jobs",
  "IT Development & Architecture": "dev-architecture-jobs",
  "IT Testing": "testing-jobs",
  "Solution Consulting": "solution-consulting-jobs",
  "Design": "design-jobs",
  "Digital Strategy": "digital-strategy-jobs",
  "Product & Operations": "product-ops-jobs"
}

async function getData(entry_id) {
  document.querySelector('.code').hidden = true
  document.querySelector('.spinner-border').hidden = false
  let Submissions = new BaaS.TableObject('submissions')
  let query = new BaaS.Query()
  query.compare('serial', '=', entry_id)

  async function getRecord() {
    try {
      let res = await Submissions.setQuery(query).find()
      // success
      return res
    } catch(err) {
      // error
      throw err
    }
  }

  let record = await getRecord()
  console.log(record)
  if (record.data.objects.length == 0) {
    document.querySelector('input').value = ''
    document.querySelector('.code').hidden = false
    document.querySelector('.spinner-border').hidden = true
    document.querySelector('.oops').hidden = false
  } else {
    let entry = record.data.objects[0]
    if (entry) {
      console.log(entry)
      document.querySelector('.intro').hidden = false
      if (document.querySelector('.quiz')) {
        document.querySelector('.quiz').hidden = true
      }
      document.querySelector('#fit').hidden = false
      document.querySelector('#chat').hidden = false
      document.querySelector('.spinner-border').hidden = true
      document.querySelector('.header').style.height = 'auto'
      document.querySelector('#user-name').innerText = entry.name
      document.querySelector('.sharing').hidden = false
      entry.cities.forEach(city => {
        document.querySelector(`#${city.toLowerCase()}`).hidden = false
        document.querySelector(`.info #${city.toLowerCase()}`).hidden = false
        entry.sectors.forEach(s => {
          table = document.querySelector(`.${city} #${SectorsMap[s]}`)
          if (table) {
            table.hidden = false
          }
        })
      })
    } else {
      getData(entry_id)
    }
  }
}


// parallax effect
window.addEventListener('scroll', e => {
  let scrolled = window.pageYOffset
  const bg = document.querySelector('.bg')
  bg.style.top = - (scrolled * 0.15)
})

// code input logic
const button = document.querySelector('.report-btn')
button.addEventListener('click', e => {
  const input = document.querySelector('input')
  getData(input.value)
})

// if person coming from survey
const queryString = window.location.search
const urlParams = new URLSearchParams(queryString);
if (urlParams.get('survey') == 'true') {
  document.querySelector('.quiz').remove()
  document.querySelector('.code h2').style.fontWeight = 'bold'
  document.querySelector('.code h2').innerText = "Ready to find out your future salary?"
}



// sharing the link
const sharing_button = document.querySelector('.sharing button')
const copyToClipboard = () => {
  const el = document.createElement('textarea');
  el.value = "https://salaries.wogengapp.cn/";
  el.setAttribute('readonly', '');
  el.style.position = 'absolute';
  el.style.left = '-9999px';
  document.body.appendChild(el);
  el.select();
  document.execCommand('copy');
  document.body.removeChild(el);
  sharing_button.innerText = "Link copied, ready to send ✅"
};
sharing_button.addEventListener('click', copyToClipboard)
