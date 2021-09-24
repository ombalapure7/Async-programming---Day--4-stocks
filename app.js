// Reload Screen
function clearScreen() {
  window.location.reload();
}

// Fetch list of countries
async function getStocks(event) {
  event.preventDefault();
  let companyName = document.getElementById("companyName").value;
  let companyLogoImg;

  companyName = companyName.toUpperCase();
  console.log("Company name entered: ", companyName);

  if (companyName === "GOOGL") {
    companyLogoImg = "https://blog.hubspot.com/hubfs/image8-2.jpg";
  } else if (companyName === "MSF") {
    companyLogoImg = "https://www.designbust.com/download/1060/png/microsoft_logo_transparent512.png";
  } else if (companyName === "AAPL") {
    companyLogoImg = "https://cdn.mos.cms.futurecdn.net/yJaNqkw6JPf2QuXiYobcY3-1024-80.jpg.webp";
  }

  const data = await fetch(
    `https://api.tiingo.com/tiingo/daily/${companyName}/prices?startDate=2019-1-1&endDate=2019-11-1&token=0e3bf1653ea9a3f33d06648dab584b14295de9de`
  );
  const stocks = await data.json();

  const stocksArr = [];
  stocks.forEach((stock) => {
    stocksArr.push({
      name: companyName,
      close: stock.close,
      high: stock.high,
      low: stock.low,
      open: stock.open,
    });
  });

  console.log("Stocks Array: ", stocksArr);

  let createStockBar = (close, high, low, open) => {
    return `
      <div class="image-wrapper">
        <img src="${companyLogoImg}" />
      </div>
      <div class="description text-white bg-dark">
        <p>Close: ${close}</p>
        <p>High: ${high}</p>
        <p>Low: ${low}</p>
        <p>Open: ${open}</p>
      </div>`;
  };

  for (let i = 1; i <= 9; i++) {
    let div = document.createElement("div");
    div.className = `card`;

    div.innerHTML = createStockBar(
      stocksArr[i].close,
      stocksArr[i].high,
      stocksArr[i].low,
      stocksArr[i].open
    );

    // Append the cards to each grid cells
    document.querySelector(`.item-${i}`).append(div);
  }
}