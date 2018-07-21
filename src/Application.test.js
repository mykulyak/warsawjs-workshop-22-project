import { JSDOM } from 'jsdom';
import Application from './Application';

let window;
let document;

const html = `
  <!DOCTYPE html>
  <html>
    <head>
      <title></title>
    </head>
    <body>
      <div id="root">Mount point</div>
    </body>
  </html>
`;

beforeEach(() => {
  const dom = new JSDOM(html);
  window = dom.window;
  document = window.document;
});

afterEach(() => {
  document = undefined;
  window = undefined;
});

test('punkt montowania istnieje', () => {
  const mountPoint = document.getElementById('root');
  expect(mountPoint).toBeTruthy();
  expect(mountPoint.tagName).toEqual('DIV');
  expect(mountPoint.innerHTML).toEqual('Mount point');
});

test('aplikacja renderuje się w zadanym miejscu', () => {
  const app = new Application();
  app.initialize(document.getElementById('root'));

  const elements = document.querySelectorAll('.application');
  expect(elements).toBeTruthy();
  expect(elements.length).toEqual(1);
  expect(elements[0].tagName).toEqual('DIV');

  const titleEl = document.querySelector('.title');
  expect(titleEl).toBeTruthy();
  expect(titleEl.innerHTML).toEqual('Wirtualny Kantor');

  const radioButtons = document.querySelectorAll('[name="operation"]');
  expect(radioButtons.length).toBe(3);
  expect(radioButtons[1].value).toEqual('sell');
});
