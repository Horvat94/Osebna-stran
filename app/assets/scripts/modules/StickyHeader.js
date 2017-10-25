import $ from "jquery";
import waypoints from "../../../../node_modules/waypoints/lib/noframework.waypoints";
import smoothScroll from "jquery-smooth-scroll";

class StickyHeader{
	constructor(){
		this.siteHeader = $(".site-header");
		this.logoHeader = $(".site-header__logo");
		this.contentNavMobile = $(".site-header__menu-content");
		this.navHeader = $(".primary-nav");
		this.trigerElement = $(".large-hero__author");
		this.headerLinks = $(".primary-nav a");
		this.footerLinks = $(".footer__nav-main a");
		this.pageSections = $(".page-section");
		this.heroPage = $(".large-hero__title");
		this.createHeaderWaypoint();
		this.createPageSectionWaypoint();
		this.addSmoothScrolling();
		this.refreshWaypoints();
		this.clearNavOnTop();
	}

	refreshWaypoints(){
		Waypoint.refreshAll();//refresha čisto vse waypointse v brskalniku
	}

	createHeaderWaypoint(){
		var mainCall = this;
		new Waypoint({
			element: this.trigerElement[0],
			handler: function(direction){
				if( direction == "down"){
					mainCall.siteHeader.addClass("site-header--sticky");
					mainCall.contentNavMobile.addClass("site-header__menu-content--background-dark");
					mainCall.logoHeader.addClass("site-header__logo--sticky");
					mainCall.navHeader.addClass("primary-nav--sticky");
					
				}else{
					mainCall.siteHeader.removeClass("site-header--sticky");
					mainCall.contentNavMobile.removeClass("site-header__menu-content--background-dark");
					mainCall.logoHeader.removeClass("site-header__logo--sticky");
					mainCall.navHeader.removeClass("primary-nav--sticky");
				}
			}
		});
	}

	createPageSectionWaypoint(){
		var mainCall = this;
		this.pageSections.each(function(){
			var currentPageSection = this;
			new Waypoint({
				element: currentPageSection,
				handler: function(direction){

					if(direction == "down"){
						var matchHeaderlink = currentPageSection.getAttribute("data-link");//vzamemo povezavo trenutnega odseka strani
						mainCall.headerLinks.removeClass("is-current-link");
						$(matchHeaderlink).addClass("is-current-link");
					}
				},
				offset: "50%"
			});

			new Waypoint({
				element: currentPageSection,
				handler: function(direction){

					if(direction == "up"){
						var matchHeaderlink = currentPageSection.getAttribute("data-link");//vzamemo povezavo trenutnega odseka strani
						mainCall.headerLinks.removeClass("is-current-link");//izbrisemo vse razrede iz primary-nav a
						$(matchHeaderlink).addClass("is-current-link");//poiščemo po id-ju odsek in mu dodamo razred
					}
					
				},
				offset: "-40%"
			});
		});
	}

	clearNavOnTop(){
				var mainCall = this;
				new Waypoint({
					element: this.heroPage[0],
					handler: function(direction){
						if(direction == "up"){
							mainCall.headerLinks.removeClass("is-current-link");
						}

					}
				});
		}


	addSmoothScrolling(){
		this.headerLinks.smoothScroll();//na vsak header link kličemo plugin
		this.footerLinks.smoothScroll();
	}
}

export default StickyHeader;