const template = `
  <div class="application">
    <div class="title">Wirtualny Kantor</div>
    <div class="rates"></div>
    <div class="form">
      <form>
        <div class="form-row">
          <label>
            <input type="radio" name="operation" value="buy"> Kup
          </label>
          <label>
            <input type="radio" name="operation" value="sell"> Sprzedaj
          </label>
          <label>
            <input type="radio" name="operation" value="exchange"> Wymień
          </label>
        </div>
        <div class="form-row">
          <label>
            Sprzedaję <select name="currency-from"></select>
          </label>
          <label>
            Kupuję <select name="currency-to"></select>
          </label>
        </div>
        <div class="form-row">
          <label>
            Kwota
            <input type="number" />
          </label>
        </div>
      </form>
    </div>
  </div>
`;

export default class Application {
  initialize(root) {
    root.innerHTML = template;
  }
}
