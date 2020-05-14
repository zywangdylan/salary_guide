const BaaS = window.BaaS
BaaS.init('69971365ede01a812c8a')
const SectorsMap = {
  "Data and AI": "data-ai-jobs"
}

async function getData() {
let Submissions = new BaaS.TableObject('submissions')

  async function getRecord() {
    try {
      let queryString = window.location.search
      let entry_id = new URLSearchParams(queryString).get('id')
      let res = await Submissions.get(entry_id)
      // success
      return res
    } catch(err) {
      // error
      throw err
    }
  }

  let record = await getRecord()
  let entry = record.data
  if (entry) {
    entry.sectors.forEach(s => {
      table = document.querySelector(`#${SectorsMap[s]}`)
      console.log(table)
      if (table) {
        table.hidden = false
      }
    })
  } else {
    getData()
  }
}

getData()
