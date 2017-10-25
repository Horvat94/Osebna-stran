import $ from "jquery";

class DropDownMenu{

	constructor(){
		this.siteHeader = $(".site-header");
		this.logoHeader = $(".site-header__logo");
		this.dropDownMenu = $(".site-header__drop-down-menu");
		this.menuContent = $(".site-header__menu-content");
		this.events();
	}

	events(){
		this.dropDownMenu.click(this.toggleTheMenu.bind(this));
	}

	toggleTheMenu(){
		this.menuContent.toggleClass("site-header__menu-content--vissible");
		this.dropDownMenu.toggleClass("site-header__drop-down-menu--close");
		this.logoHeader.toggleClass("site-header__logo--smaller");

	}

}

export default DropDownMenu;