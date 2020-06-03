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

  async function getRecord() {
    try {
      // let queryString = window.location.search
      // let entry_id = new URLSearchParams(queryString).get('id')
      let res = await Submissions.get(entry_id)
      // success
      return res
    } catch(err) {
      // error
      return err
    }
  }

  let record = await getRecord()
  if (record.status != 200) {
    document.querySelector('input').value = ''
    document.querySelector('.code').hidden = false
    document.querySelector('.spinner-border').hidden = true
    document.querySelector('.oops').hidden = false
  } else {
    let entry = record.data
    if (entry) {
      console.log(entry)
      document.querySelector('.intro').hidden = false
      document.querySelector('.spinner-border').hidden = true
      document.querySelector('.header').style.height = 'auto'
      document.querySelector('#user-name').innerText = entry.name
      entry.cities.forEach(city => {
        document.querySelector(`#${city.toLowerCase()}`).hidden = false
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
const input = document.querySelector('input')
input.addEventListener('input', e => {
  if (input.value.length == 24) {
    getData(input.value)
  }
})
