import nodeListForEach from './node-list-for-each';
import tel from './tel';
import animation from './animation';
import menuOpen from './menu-open';
import modal from './modal';
import headerScroll from './header';
import sliders from './sliders';
import number from './number';
import btnUp from './btn-up';
import accordion from './accordion';
import goodQuantity from './good-quantity';
import colorsSelect from './colors-select';
import footerForm from './footer-form';
import calcSlider from './calculator';
import ankors from './ankors';

class App {
  static init() {
    nodeListForEach();
    tel();
    animation();
    menuOpen();
    headerScroll();
    modal();
    sliders();
    number();
    btnUp();
    accordion();
    goodQuantity();
    colorsSelect();
    footerForm();
    calcSlider();
    ankors();
  }
}


App.init();
window.App = App;
