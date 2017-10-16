/*Coverflow Image Gallery By Dynamic Drive
* Created: Jan 14th', 2015 by DynamicDrive.com.
* Dependencies: jQuery, Sly scrolling lib https://github.com/darsain/sly
* Visit http://www.dynamicdrive.com/ for full source code
*/


document.getElementsByTagName('html')[0].className += ' ' +
	("ActiveXObject" in window? 'ie' : 'no-ie')


function coverflowimages(options){
	if ( !document.getElementById('coverflowoverlay') ){
		var $overlay = $('<div id="coverflowoverlay" />').appendTo(document.body)
		var $enlargearea = $('<div id="coverenlargearea" />').appendTo(document.body)
	}
	else{
		var $overlay = $('#coverflowoverlay')
		var $enlargearea = $('#coverenlargearea')
	}
	var $body = $(document.body)
	var $overlayenlarge = $overlay.add($enlargearea)
	var $wrap  = $('#' + options.coverid)
	var $frame = $wrap.find('div.frame:eq(0)')
	var frameinnerHTML = ''
	var activeitem = -1
	var onselecteditemclick = options.onselecteditemclick || selecteditemaction

	var preloadimages = []
	for (var i = 0; i<options.images.length; i++){
		if (options.images[i][1]){
			if (options.preloadlarge){
				preloadimages[i] = new Image()
				preloadimages[i].src = options.images[i][1]
			}
		}
		frameinnerHTML += '<li style="background-image:url(' + options.images[i][0] + ')" data-itemindex="' + i +'"></li>\n'
	}
	$frame.find('ul:eq(0)').html( frameinnerHTML )

	function selecteditemaction(e, activeitem){ // default call back function for onselecteditemclick, showing enlarged image
		$overlay.css({opacity:.9, zIndex: 1000})
		$enlargearea.html('<img src="' + options.images[activeitem][1] + '"/>' + 
			((options.images[activeitem][2])? '<div id="desc">' + options.images[activeitem][2] +'</div>': '')
		)

		var maxheight = $(window).height()
		$enlargearea.css({opacity:1, zIndex: 1001})
		.data('isvisible', true)
		.find('img:eq(0)')
			.css({maxWidth: $(window).width() * .95, maxHeight: $(window).height()})
		e.stopPropagation()

	}
	
	// Call Sly on frame. See https://github.com/darsain/sly/blob/master/docs/Options.md
	$frame.sly({
		horizontal: 1,
		itemNav: 'forceCentered',
		smart: 1,
		activateMiddle: 1,
		activateOn: 'click',
		mouseDragging: 1,
		touchDragging: 1,
		releaseSwing: 1,
		startAt: 1,
		scrollBar: $wrap.find('.scrollbar'),
		scrollBy: 1,
		speed: 300,
		elasticBounds: 1,
		easing: 'swing',
		dragHandle: 1,
		dynamicHandle: 1,
		clickBar: 1,
		// Navigation buttons
		pagesBar: $wrap.find('.pages'),
		activatePageOn: 'click'
	})


	$(window).on('resize', function(){
		$frame.sly("reload");
	})

	$frame.on('mousedown', function(e){ // test during 'mousedown' phase if distination LI is active item, before 'onclick'
		if (  $(e.target).hasClass('active') ){
			activeitem = $(e.target).data('itemindex')
		}
	})

	$frame.on('click', function(e){ // onclick the main cover flow container
		var $target = $(e.target)
		if (  $(e.target).data('itemindex') == activeitem ){
			onselecteditemclick(e, activeitem)
		}
	})

	$overlayenlarge.unbind().on('click', function(){
		if ( $enlargearea.data('isvisible') ){
			$overlayenlarge.css({opacity:0, zIndex:-1})
			$enlargearea.data('isvisible', false)
		}
	})

}

///////// Initialization code ////////////////

coverflowimages({
	coverid: 'coverflow1',
	images: [
						['img/gallery/1.jpg', 'img/gallery/1.jpg', 'Meet the 2015/16 committee'],
						['img/gallery/2.jpg', 'img/gallery/2.jpg', 'TheShop itself. Located in the middle of the JCR'],
						['img/gallery/3.jpg', 'img/gallery/3.jpg','ATA about to present the Christmas Live Lounge'],
						['img/gallery/4.jpg', 'img/gallery/4.jpg', 'Lenny and the Mandem performing at Christmas Live Lounge'],
						['img/gallery/5.jpg', 'img/gallery/5.jpg', 'One of the most popular "Toastie of the Week" (TOTW) options'],
                        ['img/gallery/6.jpg', 'img/gallery/6.jpg', 'Sims setting up shop by reception when #domegate forced us out of the JCR'],
                        ['img/gallery/7.jpg', 'img/gallery/7.jpg', 'Easter Live Lounge about to kick off'],
                        ['img/gallery/8.jpg', 'img/gallery/8.jpg', 'The Open Day Reps chilling by the shop while pre-fresh enjoy a quiz']// <-- no comma after last image
					] // <-- no comma after last option
})
