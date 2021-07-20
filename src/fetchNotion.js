const databaseId = process.env.NOTION_DATABASE_ID
const notionURL = `https://api.notion.com/v1/databases/${databaseId}/query`

// Setting the fetching filters
const filterSetting = (sectorArray) => {
  if (sectorArray.length === 0) {
    return {}
  } else if (sectorArray.length === 1) {
    return {
      'property': 'Category',
      'select': {
        'equals': sectorArray[0]
      }
    }
  } else {
    const filterArray = []
    sectorArray.forEach(sector => {
      filterArray.push({
        'property': 'Category',
        'select': {
          'equals': sector
        }
      })
    })
    return {
      'or': filterArray
    }
  }
}

// Fetching Notion Table data via notion URL
const fetchNotionSalaryTable = async (sectorArray) => {
  const data = await fetch(notionURL, {
    method: 'POST',
    headers: {
      'Notion-Version': '2021-05-13',
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${process.env.NOTION_TOKEN}`
    },
    body: JSON.stringify({'filter': filterSetting(sectorArray)})
  })
    .then(res => res.json())
  return data
}

const updateSalaryData = async (sectorArray) => {
  const salaryData = await fetchNotionSalaryTable(sectorArray)
}

export { updateSalaryData }
