$(document).ready(function(){
	reHeight();
	sortable();
	draggable(); //멀티팝업 드레그
	tooltip(); //마우스 오버 툴팁


	/*gnb*/
	$('.btn-gnb').click(function(){
		var gnbList = $(this).next('.gnb-list');
		gnbList.fadeIn('300');	
	});
	$('.btn-gnb-close').click(function(){
		$(this).removeClass('on').closest('.gnb-list').fadeOut('100');
	});
	
	// gnb외부영역 클릭 시 팝업 닫기
	$(document).mouseup(function (e) {
		var container = $(".gnb-list");		
		if (!container.is(e.target) && container.has(e.target).length === 0){		
			container.fadeOut('100');			
		}
	});


	/* 상담 on/off */
	$('.btn-toggle-area button').click(function(){
		var header = $(this).closest('.header');
		if($(this).hasClass('on')){
			$(this).removeClass('on').text('OFF');
			header.removeClass('on');
		}else{
			$(this).addClass('on').text('ON');
			header.addClass('on');
		}
	});

	/* 공통 토글 버튼 */
	$('.btn-toggle').click(function(){
		$(this).toggleClass('on');
	});

	/* 버튼 1개선택시 스타일 */
	$('.radio-select > button').click(function(){
		$(this).addClass('on').siblings().removeClass('on');
	});

	/* 사용/사용안함 스위치버튼 */	
	$(document).on('click', '.button-switch', function(){
		var target = $(this).closest('.btn-switch-area');
		if(target.hasClass('on')){
			target.removeClass('on').find('.txt').text('사용 안함');
		}else{
			target.addClass('on').find('.txt').text('사용');
		}
	});


	/* 탭영역 */	
	$(document).on('click', '.tab-item', function(){
		if($(this).parent('div').hasClass('more-tab')){		//간편발송 토스트 팝업
			var tabName = $(this).parent('div').parent('div').attr('class');
				var tabItem = $(this);
				var idx = $(this).index();					
				var tabConts = $(this).closest('.'+tabName).next('.tab-conts');
				if(!tabItem.hasClass('on')){
					tabItem.addClass('on').siblings('.tab-item').removeClass('on');
					tabConts.children('.tab-cont').hide().removeClass('on').eq(idx).show().addClass('on');
				}
		}else{
			if(!$(this).parent('div').hasClass('noneTab')){
				var tabName = $(this).parent('div').attr('class');
				var tabItem = $(this);
				var idx = $(this).index();					
				var tabConts = $(this).closest('.'+tabName).next('.tab-conts');
				if(!tabItem.hasClass('on')){
					tabItem.addClass('on').siblings('.tab-item').removeClass('on');
					tabConts.children('.tab-cont').hide().removeClass('on').eq(idx).show().addClass('on');
				}
			}
		}
		
	
	});

	/* 검색네비게이션 */
	 $('.chat-area .btn-search').click(function(){
		var targetDiv = $(this).closest('.top').next('.search-area');	
		if(!$(this).hasClass('on')){
			$(this).addClass('on');
			targetDiv.addClass('on');
		}	
	});
	$('.search-box .btn-close').click(function(){
		var targetDiv = $(this).closest('.search-area');
		targetDiv.removeClass('on');
		targetDiv.prev('.top').find('.btn-search').removeClass('on');
	});


	/* 클릭형 툴팁 */
	$(document).on('click', '.btn-layer', function(){
		// var btnH = $(this).outerHeight();
		// var oOffset = $('.chat-list').offset().top;
		var sHeight = $('.chat-list').outerHeight(); 		
		var oHeight = $(this).closest('.tooltip-area').find('.tooltip-layer').outerHeight();
		var divTop = $(this).closest('.tooltip-area').offset().top - 211; // 스크롤시작지점 offset (211)

		
		if($(this).hasClass('on')){
			$(this).removeClass('on');		
			$(this).closest('.tooltip-area').find('.tooltip-layer').hide();	
		}else{
			$('.tooltip-area').find('.tooltip-layer').hide();
			$('.tooltip-area').find('.btn-layer').removeClass('on');
			$(this).addClass('on');

			if( divTop + oHeight > sHeight ){
				$(this).closest('.tooltip-area').find('.tooltip-layer').css({
					"top": '',
					"bottom": 28			
				}).show();
			
			}else{
				$(this).closest('.tooltip-area').find('.tooltip-layer').css({
					"top": 28,
					"bottom": ''
				}).show();
			}
			
		}
	});
	$('.tooltip-layer .link-area > button').click(function(){
		$(this).closest('.tooltip-area').find('.tooltip-layer').hide();	
		$(this).closest('.tooltip-area').find('.btn-layer').removeClass('on');
	});
	//외부영역 클릭시 툴팁 닫기
	$(document).mouseup(function (e) {
		var container = $(".tooltip-area");		
		if (!container.is(e.target) && container.has(e.target).length === 0){		
			container.find('.tooltip-layer').hide();
			container.find('.tooltip-layer').prev('.btn-layer').removeClass('on');		
		}
	});
	/* 1:1상담내역 검색 show/hide */
	$('.history .search-area > button').click(function(){
		var item = $(this).attr('data-title');
		var target = $(this).parent('.search-area').next('.search-layer');
		target.find('.'+item).css('display','flex');
	});
	$('.history .search-layer > div').each(function(){
		$(this).find('.btn-close').click(function(){
			$(this).closest('div').hide();
		});
	});


	/* datepicker - 단일검색 */
	$( ".single-cal-layer .single" ).datepicker({
		showOn: "button",
		buttonImage: "../images/icon/icon_20_date.png",
		buttonImageOnly: true,
		dateFormat: "yy-mm-dd", 	
		changeMonth: true,
		changeYear: true,		
		minDate: '-100y',
		nextText: '다음 달', 
		prevText: '이전 달', 
		numberOfMonths:1, 		 
		showMonthAfterYear: true ,   
		dayNamesMin: ['일', '월', '화', '수', '목', '금', '토'], 
		monthNamesShort: ['01','02','03','04','05','06','07','08','09','10','11','12'],
		// beforeShowDay: function(date){
		// 	if (date < new Date())
		// 		return [false];
		// 	return [true];
		// },
		onSelect: function (dateText) {
			$(this).closest('.single-cal-area').find('.date').val(this.value);	
			$('.single-cal-area').removeClass('on');
			$('.single-cal-area').find('.single-cal-layer').removeClass('on');	
		}
	  });
	$('.btn-cal-single').click(function(){
		$(this).closest('.single-cal-area').addClass('on');
		$(this).closest('.single-cal-area').find('.single-cal-layer').addClass('on');
	});
	$('.btn-single-close').click(function(){
		$(this).closest('.single-cal-area').removeClass('on');
		$(this).closest('.single-cal-area').find('.single-cal-layer').removeClass('on');
	});

	/* datepicker - 기간검색 */
	var dateFormat = "yy-mm-dd",
	from = $(".from").datepicker({		
		dateFormat: "yy-mm-dd", 	
		changeMonth: true,
		changeYear: true,		
		minDate: '-100y',
		nextText: '다음 달', 
		prevText: '이전 달', 
		numberOfMonths:1, 		 
		showMonthAfterYear: true ,   
		dayNamesMin: ['일','월', '화', '수', '목', '금', '토' ],
		monthNamesShort: ['01','02','03','04','05','06','07','08','09','10','11','12'],

	onSelect: function (dateText) {
		$(this).closest('.multi-cal-area').find('.input-from').val(this.value);		
	},

	})
	.on("change", function () {
		to.datepicker("option", "minDate", getDate(this));
	}),
	to = $(".to").datepicker({		
		dateFormat: "yy-mm-dd", 	
		changeMonth: true,
		changeYear: true,		
		minDate: '-100y',
		nextText: '다음 달', 
		prevText: '이전 달', 
		numberOfMonths:1, 		 
		showMonthAfterYear: true ,   
		dayNamesMin: ['일','월', '화', '수', '목', '금', '토'], 
		monthNamesShort: ['01','02','03','04','05','06','07','08','09','10','11','12'],
	onSelect: function (dateText) {
		$(this).closest('.multi-cal-area').find('.input-to').val(this.value);			
	}
	})
	.on("change", function () {
		from.datepicker("option", "maxDate", getDate(this));
	});

	function getDate(element) {
	  var date;
	  try {
		date = $.datepicker.parseDate(dateFormat, element.value);
	  } catch (error) {
		date = null;
	  }
	  return date;
	}
	// setDate(); 

	$('.btn-cal').click(function(){
		var parentName = $(this).closest('[class*="layer-pop"]').attr('data-layer-name');
		$(this).closest('.multi-cal-area').prev('.btn-date-area').find('button').removeClass('on');
		$(this).closest('.multi-cal-area').prev('.btn-date-area').find('.btn-cal-setting').addClass('on');
		
		if(parentName == 'chat-util'){
			$(this).closest('.btn-date-area').next('.multi-cal-area').addClass('on');
			$(this).closest('.btn-date-area').next('.multi-cal-area').find('.multi-cal-layer').addClass('on');
		}else{
			$(this).closest('.multi-cal-area').addClass('on');
			$(this).closest('.multi-cal-area').find('.multi-cal-layer').addClass('on');
		}
	
	});
	$('.btn-cal-setting').click(function(){
		$(this).closest('.btn-date-area').next('.multi-cal-area').find('.btn-cal').trigger('click');
	});	
	
	
	$('.btn-cal-close').click(function(){
		$(this).closest('.multi-cal-area').removeClass('on');
		$(this).closest('.multi-cal-area').find('.multi-cal-layer').removeClass('on');
	});	
	

});


$(window).on('load', function(){
	rdoCheck(); // 라디오,체크박스

	//체크박스 라벨 스타일
	$('input[type=checkbox].styled').change(function(){
		if(this.checked){
			$(this).closest('.chkbox').addClass('on');
		}else{
			$(this).closest('.chkbox').removeClass('on');
		}
	});

	//라디오 라벨 스타일
	$('input[type=radio].styled').change(function(){
		var name = $(this).attr('name');
		if(this.checked){
			$('input[name="'+ name +'"]').closest('.chkbox').removeClass('on');
			$(this).closest('.chkbox').addClass('on');
		}
	});


	//셀렉트 화살표 스타일
	$('select.styled').on('click',function (){
		if($(this).hasClass('on')){
			$(this).removeClass('on')
		}else{
			$(this).addClass('on')
		}
	  })
	  .on('blur',function (){
		$(this).removeClass('on')
	});
	

	//레이어팝업 (딤드 + 가운데정렬)
	$(document).on('click', '.btnPop', function(){  
		var lyBtnObj = $(this).attr('data-title');
		layerBtnEvent(lyBtnObj);
	});	
	/* 팝업닫기 */
    $(document).on('click', '.open .popClose,.dimmed', function(){	
		var lyBtnObj = $(this).closest('.layer-popup').attr('data-layer-name');
		layerBtnEventClose(lyBtnObj);		
    });
	

	//레이어팝업 (상담쪽 영역 고정)
	$(document).on('click', '.btnPopFixed', function(){
		layerPopFixed();
		$(this).addClass('on');

		var name = $(this).attr('data-title');
        $('.layer-popup-fixed[data-layer-name=' + name + ']').fadeIn(100, function(){          
            $(this).addClass('open').closest('.layer-popup');
			layerPopFixed();
        });
	});
	/* 팝업닫기 */
	$(document).on('click', '.popClose', function(){      
		$(this).closest('.layer-popup-fixed').removeClass('open').scrollTop(0).fadeOut(300, function(){
			$('.btnPopFixed.on').focus().removeClass('on');
			$(this).closest('.layer-popup-fixed').css('inset', '');		
		});			
	});


	//토스트팝업 (하단에서 슬라이딩)
	$('.btnToest').click(function(){
		var name = $(this).attr('data-title');
		var chatBoxH =  $('.chat-box').outerHeight();
		var warnH = $('.warning-txt').outerHeight();
	
		if(name == "Toest01"){
			$('.toest-popup[data-layer-name=' + name + ']').css('bottom', '-1px').addClass('on');
		
		}else {
			$('.toest-popup[data-layer-name=' + name + ']').addClass('on').css('bottom', (chatBoxH + warnH) - warnH);
		
			if(name == "Toest02"){
				$(this).addClass('on');
				$('.chat-box').addClass('quick').find('textarea').attr('placeholder','자주 쓰는 문구를 선택해 주세요');
			}		
		}
	}); 
	/* 팝업닫기 */
	$(document).on('click', '.toestClose', function(){     
		var name = $(this).closest('.toest-popup').attr('data-layer-name');
		$(this).closest('.toest-popup').hide().css('bottom','-100%').removeClass('on').css('display','');	
		$('.chat-box').attr('style','');
		if(name == 'Toest02'){
			$('.btn-quick-text').removeClass('on');
			$('.chat-box').removeClass('quick').find('textarea').attr('placeholder','메시지 입력(Enter시 메시지 발송됨)');			
		}	
	 });
	 /* 리스트 클릭시 팝업 닫기 */
	 $(document).on('click', '.send-list.type2 a', function(){
		$(this).closest('.toest-popup').hide().css('bottom','-100%').removeClass('on').css('display','');
		$('.chat-box').removeClass('quick').attr('style','');
		
	 });

   
	 //위치고정 레이어(간편발송 외 공통)
	 $(document).on('click', '.btnPopBorder', function(){  
		var lyBtnObj = $(this).attr('data-title');	
		layerBtnEvent2(lyBtnObj);		
	}); 
	/* 팝업닫기 */
	$(document).on('click', '.popCloseBorder', function(){	
		var lyBtnObj = $(this).closest('.layer-popup-border').attr('data-layer-name');
		layerBtnEventClose2(lyBtnObj);		
	});


	 //상담현황 그래프 레이어
	 $(document).on('click', '.btnPopGraph', function(){  
		var lyBtnObj = $(this).attr('data-title');	
		layerGraph(lyBtnObj);		
	}); 
	/*팝업닫기*/
	$(document).on('click', '.popCloseGraph', function(){	
		var lyBtnObj = $(this).closest('.layer-popup-border').attr('data-layer-name');
		layerGraphClose(lyBtnObj);		
	});	

});


// 라디오,체크박스
function rdoCheck(){
    $('input[type=radio].styled, input[type=checkbox].styled').each(function(){
        if(!$(this).parent().hasClass('chkbox')){
            $(this).wrap('<span class="chkbox"></span>');
            var $chk = $(this).closest('.chkbox');
            $chk.append('<span class="chk"></span>');

			if(this.checked){
				$(this).closest('.chkbox').addClass('on');
			}else{
				$(this).closest('.chkbox').removeClass('on');
			}
        }
    });
}


// 레이어팝업 고정 위치설정
function layerPopFixed(){
    $('.layer-popup-fixed').each(function(){
		var parentName = $(this).attr('data-layer-name');
		var targetParent = $('.main-chat').find('.'+parentName);
		var sWidth = $('.wrapper').outerWidth();

		var posLeft = targetParent.position().left;
		var posRight = $('.wrapper').width() - (targetParent.position().left + targetParent.outerWidth());
		var posTop = targetParent.position().top;	

		if(!$(this).hasClass('open')){ // 열리지 않았을경우에만 실행
			if(posRight + targetParent.outerWidth() > sWidth ){  // 부모 position + width가 wrapper 너비 이상일때
				$(this).find('.multi-cal-layer').css({				
					"left": 0,
					"right": ''
				})
				$(this).css({
					"top": posTop,
					"left": 0,
					"right": ''			
				})				
			}else if(posLeft == 0){ // 손님정보가 맨 앞으로 갔을경우
				$(this).find('.multi-cal-layer').css({				
					"left": 0,
					"right": ''
				})		
				$(this).css({
					"top": posTop,
					"left": 0,
					"right": ''
				})				
			}else{
				$(this).find('.multi-cal-layer').css({				
					"right": 0,
					"left": ''
				})	
				$(this).css({
					"top": posTop,
					"left": '',
					"right": posRight
				})	
			}
		}	
    });
}


//1:1상담 컨텐츠 높이 변경
function reHeight(){
	$('.reHeight').each(function(){
		autoHeight();
		$(this).on('propertychange change keyup paste input', function(){
			var currentVal = $(this).val();
			if(currentVal == oldVal) {
				return;
			}		
			var oldVal = currentVal;
			autoHeight();
		});

		function autoHeight(){
			$('.chat-box textarea').each(function(){
				var chatCont = $(this).closest('.chat-wrap').find('.chat-cont');
				
				var chatH = $('.chat-wrap').outerHeight();
				var chatInputH = $('.chat-box').find('textarea').height();
				var chatBoxH =  $('.chat-box').outerHeight();
				var warnH = $('.warning-txt').outerHeight() + 1;
				var calcH  = chatH - chatInputH;
			
				
				//console.log( chatH + '/' + chatInputH + '/' + chatBoxH + '/' + calcH);
				if(chatInputH > 99){
					$(this).css('overflow-y', 'auto');
				}else{
					$(this).css('overflow-y', 'hidden');
				}
				$('.toest-popup.on').css('bottom',chatBoxH );					
				$(this).css('height', '20px').height(this.scrollHeight);
				chatCont.css('height', calcH ).scrollTop(chatCont[0].scrollHeight);

			});
		}
	});
}

//sortable
function sortable(){
	$('.sortable').sortable();
}

//draggable

function draggable(){
	$('.draggable').draggable({
		containment : '.wrapper'
	});

	
}

//토스트 메시지 팝업 
function toestTxt(){
	$('.toest-txt').fadeIn(400).delay(1000).fadeOut(400);
}


// 레이어팝업 설정
function layerPop(){
    $('.btnPop, .layer-popup').each(function(){ 
       var tit = $(this).attr('title');
        $(this).attr('layer-name', tit).removeAttr('title');
    });

    $('.layer-popup').each(function(){
		var hei = $('.wrapper').outerHeight();		
        var popH = $(this).find('.popup').outerHeight();
        var pdT = (hei - popH) / 2;
        var mgB = $(this).find('.popup').css('margin-bottom');
        var space = mgB.replace(/px/g, '') * 2;

        if(hei - space < popH){
            $(this).css({'padding-top':mgB});
        }else{
            $(this).css({'padding-top':pdT});
        }
    });
}

//마우스오버 툴팁
function tooltip(){	
	$('.tooltip-hover').tooltip({
		position: {
		  my: "right+15 top+15",
		  at: "right bottom",
		  using: function( position, feedback ) {
			$( this ).css( position );
			$( "<div>" )
			  .addClass( "arrow" )
			  .addClass( feedback.vertical )
			  .addClass( feedback.horizontal )
			  .appendTo( this );
		  },
		}
	  });
}
 
// 레이어팝업 (딤드 + 가운데정렬)
function layerBtnEvent(obj) { 	
	var objName = obj;
	// var btnPopThis = $('.layer-popup[data-layer-name=' + objName + ']');
	var layerName =  $('.layer-popup[data-layer-name=' + objName + ']');	

	if(!layerName.hasClass('none')){ 
		layerName.addClass('on');
	}	


	$('html').addClass('popOpen');	
	layerName.fadeIn(100, function () { 		
		var objName = obj;
		var layerName =  $('.layer-popup[data-layer-name=' + objName + ']');	

		layerName.addClass('open');
		if(!layerName.hasClass('dimmed-none')){ 
			layerName.prepend('<div class="dimmed">');
			
		}else{
			$('html').removeClass('popOpen');
		}

		var hei = $(window).height();		
		var popH = layerName.find('.popup').outerHeight();
		var pdT = (hei - popH) / 2;
		var mgB = layerName.find('.popup').css('margin-bottom');
		var space = mgB.replace(/px/g, '') * 2;

		
	if(layerName.hasClass('type2')){ // 헤더고정 테이블 들어있는 팝업 (window.height보다 내용이 길어지면 꽉차게)				
		var popHeader = 0;
		//var popBottom = 0;
		var popPadding = layerName.find('.popup').css('padding-top').replace(/px/g, '') * 4; 
		var popHeader = layerName.find('.popup-header').outerHeight();
		var tblFixedHeader =layerName.find('.fix-th').outerHeight();
		var layerCont = layerName.find('.fix-head');
		var tableBody = layerName.find('table').outerWidth();
	
		if(layerName.find('.popup-info').length){			
			var popBottom = layerName.find('.popup-info').outerHeight();	
			var sum = hei - (popPadding + popHeader + tblFixedHeader + popBottom + 16);		
		}else {
			var sum = hei - (popPadding + popHeader + tblFixedHeader + 16); // 세로 스크롤영역 계산(layer-cont paddingT/B(16) 포함)		
		}						
					
		layerCont.css('max-height', sum); // 스크롤영역 높이값

		if(layerName.find('.fix-th').hasClass('type2')){ // table 개수에 따라
			layerName.find('.fix-th.type2 > div').css('width', tableBody);
		}else{
			layerName.find('.fix-th').css('width', tableBody); 
		}					
	
		if(hei < popH){
			layerName.find('.popup').css('height', 100 + 'vh' - 80); // 팝업 위아래 간격 40 * 2
			if(layerName.find('.fix-th').hasClass('type2')){
				layerName.find('.fix-th.type2 > div').css('width', tableBody - 8.5);	
			}else{
				layerName.find('.fix-th').css('width', tableBody - 17);  //스크롤 생겼을때 스크롤 너비(17)만큼 빼줌
			}				
				
		}else if(hei > popH){
				layerName.css({'padding-top':pdT});
		}

	}else{	// 기본 레이어팝업		
		if(hei - space < popH){
			layerName.css({'padding-top':mgB});
		}else{
			layerName.css({'padding-top':pdT});
		}
	}
      
 	});   
}

//레이어팝업 (딤드 + 가운데정렬) 닫기
function layerBtnEventClose(obj) {
	var objName = obj;	
	var layerName =  $('.layer-popup[data-layer-name=' + objName + ']');
	var type = layerName.hasClass('none');
	layerName.css('padding-top','').removeClass('open').scrollTop(0).fadeOut(300, function(){
		
		if(!type == true){ // 버튼 on,off 동작 여부
			$('.btnPop.on').focus().removeClass('on');	
		}		
		layerName.find('.dimmed').remove();
		$('html').removeClass('popOpen');
	});	
}

//위치고정 레이어 (간편발송포함 공통)
function layerBtnEvent2(lyBtnObj) {
	var objName = lyBtnObj;	
	var btnName = $('.btnPopBorder[data-title=' + objName + ']');	
	var layerName = $('.layer-popup-border[data-layer-name=' + objName + ']');		

		if(objName.indexOf("link-preview") > -1){ ///간편발송 미리보기 	
			
			var sHeight = window.innerHeight; 
			var oHeight = layerName.height() + 36; //푸터높이
			var divTop = btnName.closest('li').offset().top; 
			
			$('.layer-popup-border').removeClass('on');				
			btnName.closest('li').addClass('select').siblings('li').removeClass('select');
			
			if( divTop + oHeight > sHeight ){
				layerName.css({
					"top": '',
					"bottom": 0			
				}).addClass('on');
			}else{
				layerName.css({
					"top": divTop -80,
					"bottom": ''
				}).addClass('on');	
			}		
		}else{ // 일반 위치고정 팝업

			if($(this).hasClass('on')){
				btnName.removeClass('on');
				layerName.removeClass('on');
			}else{
				btnName.addClass('on');
				layerName.addClass('on');
			}
		}
}
//위치고정 레이어 닫기
function layerBtnEventClose2(obj) {
	var objName = obj;	
	var layerName =  $('.layer-popup-border[data-layer-name=' + objName + ']');
	
	layerName.removeClass('on');	
	$('.btnPopBorder[data-title=' + objName + ']').removeClass('on');	
	
}

//상담현황 그래프 레이어
function layerGraph(lyBtnObj){
	var objName = lyBtnObj;	
	var btnName = $('.btnPopGraph[data-title=' + objName + ']');	
	var layerName = $('.layer-popup-border[data-layer-name=' + objName + ']');		

	var sWidth = $('.wrapper').outerWidth();
	var winPos = $(window).scrollTop() +  $(window).outerHeight() - 78; //헤더높이 78
	var targetDiv = layerName.closest('td');	
	var posTop = targetDiv.position().top + 61;	//td높이 + 레이어간격 61
	var posLeft = targetDiv.position().left;
	var layerW = targetDiv.find('.layer-popup-border').outerWidth();
	var layerH = targetDiv.find('.layer-popup-border').outerHeight();
	
	$('.btnPopGraph, .layer-popup-border').removeClass('on');

	btnName.addClass('on');
	if(layerName.parent().hasClass('row')){
		if(posTop + layerH > winPos) {
			layerName.css({				
				"bottom": 61,
				"right": 0,
				"top" : ''
			}).addClass('on');
		
		}else{
			layerName.css({				
				"top": 61,
				"right": 0,
				"bottom" :''
			}).addClass('on');				
		}				
	}else{
		if(posLeft + layerW > sWidth) {
			layerName.css({				
				"bottom": 61,
				"right": 0,
				"left": ''
			}).addClass('on');				
		}else{
			layerName.css({				
				"bottom": 61,
				"left": 0,
				"right": ''
			}).addClass('on');				
		}
	}
}
//상담현황 그래프 레이어 닫기
function layerGraphClose(obj) {
	var objName = obj;	
	var layerName =  $('.layer-popup-border[data-layer-name=' + objName + ']');
	
	layerName.removeClass('on');	
	$('.btnPopGraph[data-title=' + objName + ']').removeClass('on');	
	
}