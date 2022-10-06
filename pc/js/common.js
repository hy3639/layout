$(document).ready(function(){
	reHeight();
	sortable();
	layerPop();

	/*gnb*/
	$('.btn-gnb').click(function(){
		var gnbList = $(this).next('.gnb-list');
		if($(this).hasClass('on')){
			$(this).removeClass('on');
			gnbList.slideUp('300');
		}else{
			$(this).addClass('on');
			gnbList.slideDown('slow');
		}
	
	});

	/* 상담 on/off */
	$('.btn-toggle-area button').click(function(){
		$(this).addClass('on').siblings().removeClass('on');
	});

	/* 공통 토글 버튼 */
	$('.btn-toggle').click(function(){
		$(this).toggleClass('on');
	});


	/* 탭영역 */
	$(document).on('click', '.tab-item', function(){
		var tabName = $(this).parent('div').attr('class');
		var tabItem = $(this);
		var idx = $(this).index();	
		console.log(tabName);
		var tabConts = $(this).closest('.'+tabName).next('.tab-conts');
		if(!tabItem.hasClass('on')){
			tabItem.addClass('on').siblings('.tab-item').removeClass('on');
			tabConts.children('.tab-cont').hide().removeClass('on').eq(idx).show().addClass('on');
		}
	});

	/* 클릭형 툴팁 */
	$(document).on('click', '.btn-layer', function(){		
		$('.tooltip-layer').hide();		
		$(this).closest('.tooltip-area').find('.tooltip-layer').show();	
		
	});
	$(document).on('click', '.tooltip-layer .btn-close', function(){		
		$(this).closest('.tooltip-layer').hide();
		// $(this).closest('.tooltip-layer').find('.btn-layer').removeClass('on');
	})

	/* datepicker */
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
		dayNamesMin: ['월', '화', '수', '목', '금', '토', '일'], 
		monthNamesShort: ['1월','2월','3월','4월','5월','6월','7월','8월','9월','10월','11월','12월'],

	onSelect: function (dateText) {
		$('#from').val(this.value);		
	}

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
		dayNamesMin: ['월', '화', '수', '목', '금', '토', '일'], 
		monthNamesShort: ['1월','2월','3월','4월','5월','6월','7월','8월','9월','10월','11월','12월'],
	
	onSelect: function (dateText) {
		$('#to').val(this.value);		
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

	$('.btn-cal').click(function(){
		$(this).closest('.multi-cal-area').find('.multi-cal-layer').addClass('on');
	});
	$('.btn-cal-close').click(function(){
		$(this).closest('.multi-cal-area').find('.multi-cal-layer').removeClass('on');
	});
	


});


$(window).on('load', function(){
	rdoCheck(); // 라디오,체크박스


	/*======= 레이어팝업 ======= */
	$(document).on('click', '.btnPop', function(){
        layerPop();
        $(this).addClass('on');
        $('html').addClass('popOpen');

		//닫히지 않아야할경우 분기
		if(!$(this).closest('.layer-popup').hasClass('noneClose')){
			$(this).closest('.layer-popup').fadeOut(300, function(){
				$(this).removeClass('open');
			});
		}        
        var name = $(this).attr('layer-name');
        $('.layer-popup[layer-name=' + name + ']').fadeIn(100, function(){
           // $(this).find('.firstTab').focus();
            $(this).addClass('open').closest('.layer-popup').prepend('<div class="dimmed">');
			layerPop();
        });
		
    });

	/* 팝업닫기 */
    $(document).on('click', '.popClose,.dimmed', function(){      
	 	$(this).closest('.layer-popup').removeClass('open').scrollTop(0).fadeOut(300, function(){
		$('.btnPop.on').focus().removeClass('on');
		$(this).closest('.layer-popup').find('.dimmed').remove();
		});	

		//팝업이 하나일경우만 body스크롤 제거
		if(!$(this).closest('.layer-popup').hasClass('scroll')){
			setTimeout(function(){
				$('html').removeClass('popOpen');
			}, 300);

		}	
    });

	/*=======// 레이어팝업 ======= */



});

$(window).resize(function(){	
	layerPop();	
	
});

$(window).scroll(function(){
	
});



// 라디오,체크박스
function rdoCheck(){
    $('input[type=radio].styled, input[type=checkbox].styled').each(function(){
        if(!$(this).parent().hasClass('chkbox')){
            $(this).wrap('<span class="chkbox"></span>');
            var $chk = $(this).closest('.chkbox');
            $chk.append('<span class="chk"></span>');
        }
    });
}


// 레이어팝업 위치설정
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
		console.log(mgB);
		console.log(pdT);
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
				var chatInputH = $('.chat-box').find('textarea').outerHeight();
				var chatBoxH =  $('.chat-box').outerHeight();
				var calcH  = chatH - chatInputH;
				console.log(chatBoxH);
				if(chatInputH > 399){
					$(this).css('overflow-y', 'auto');
				}else{
					$(this).css('overflow-y', 'hidden');
				}
				$('.search-navi').css('bottom',chatBoxH);
				$(this).css('height', 'auto').height(this.scrollHeight);
				chatCont.css('height', calcH ).scrollTop(chatCont[0].scrollHeight);

			});
		}
	});
}

//sortable
function sortable(){
	$('.sortable').sortable();
}

