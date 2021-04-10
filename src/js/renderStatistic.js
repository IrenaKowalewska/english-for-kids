export const RenderStatistic = (array) => {
  const table = document.createElement('table');
  table.innerHTML += `
    <tr>
        <th>Word
            <button class="btn-statistic sort-a-z">A-Z</button>
            <button class="btn-statistic sort-z-a">Z-A</button>
        </th>
        <th>Translation</th>
        <th>Asked</th>
        <th>Click</th>
        <th>Miss</th>
    </tr>
    `;
  const html = array.map((item) => `
        <tr>
          <td>${item.name}</td>
          <td>${item.translation}</td>
          <td></td>
          <td></td>
          <td></td>
        </tr>
        
        `);
  table.innerHTML += html.join(' ');
  return table;
};
