$(document).ready(function(){
	reHeight();
	sortable();
	//layerPop();
	draggable(); //멀티팝업 드레그
	setDate();

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
		var header = $(this).closest('.header');
		if($(this).hasClass('on')){
			$(this).removeClass('on').text('상담OFF');
			header.removeClass('on');
		}else{
			$(this).addClass('on').text('상담ON');
			header.addClass('on');
		}
	});

	/* 공통 토글 버튼 */
	$('.btn-toggle').click(function(){
		$(this).toggleClass('on');
	});


	/* 탭영역 */	
	$(document).on('click', '.tab-item', function(){
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
	
	});


	/* 클릭형 툴팁 */
	$(document).on('click', '.btn-layer', function(){
		if($(this).hasClass('on')){
			$(this).removeClass('on');		
			$(this).closest('.tooltip-area').find('.tooltip-layer').hide();	
		}else{
			$(this).addClass('on');
			$(this).closest('.tooltip-area').find('.tooltip-layer').show();	
		}
	});
	$('.tooltip-layer .link-area > a').click(function(){
		$(this).closest('.tooltip-area').find('.tooltip-layer').hide();	
		$(this).closest('.tooltip-area').find('.btn-layer').removeClass('on');
	});


	/* 1:1상담내역 검색 show/hide */
	$('.history .search-area > button').click(function(){
		var item = $(this).attr('title');
		var target = $(this).parent('.search-area').next('.search-layer');
		target.find('.'+item).css('display','flex');
	});
	$('.history .search-layer > div').each(function(){
		$(this).find('.btn-close').click(function(){
			$(this).closest('div').hide();
		});
	});

	/* datepicker - 단일검색 */
	$( ".single-calendar .single" ).datepicker({
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
		dayNamesMin: ['월', '화', '수', '목', '금', '토', '일'], 
		monthNamesShort: ['1월','2월','3월','4월','5월','6월','7월','8월','9월','10월','11월','12월'],
		beforeShowDay: function(date){
			if (date > new Date())
				return [false];
			return [true];
		}
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
		dayNamesMin: ['월', '화', '수', '목', '금', '토', '일'], 
		monthNamesShort: ['1월','2월','3월','4월','5월','6월','7월','8월','9월','10월','11월','12월'],

	onSelect: function (dateText) {
		$('#from').val(this.value);		
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
	setDate(); // 초기값 설정
 

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
		$('html').removeClass('popOpen');
		});			
    });

	/*=======// 레이어팝업 ======= */


	$(document).on('click', '.btnPopFixed', function(){
		layerPopFixed();
		$(this).addClass('on');

		var name = $(this).attr('layer-name');
		console.log(name)
        $('.layer-popup-fixed[layer-name=' + name + ']').fadeIn(100, function(){          
            $(this).addClass('open').closest('.layer-popup');
			layerPopFixed();
        });
	});

		/* 팝업닫기 */
		$(document).on('click', '.popClose', function(){      
			$(this).closest('.layer-popup-fixed').removeClass('open').scrollTop(0).fadeOut(300, function(){
			   $('.btnPopFixed.on').focus().removeClass('on');
			  $(this).closest('.layer-popup-fixed').css('inset', '');
			//  layerPopFixed();
		   });			
	   });


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
		var hei = $(window).height();		
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

function layerPopFixed(){
    $('.btnPopFixed, .layer-popup-fixed').each(function(){ 
       var tit = $(this).attr('title');
        $(this).attr('layer-name', tit).removeAttr('title');
    });


    $('.layer-popup-fixed').each(function(){
		var parentName = $(this).attr('layer-name');
		var posLeft = $('.main-chat').find('.'+parentName).offset().left;
		if($(this).hasClass('open')){
			$(this).css('left',posLeft);
		}
    });
}


//1:1상담 컨텐츠 높이 변경
function reHeight(){
	$('.reHeight').each(function(){
		//autoHeight();
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
				var calcH  = chatH - chatInputH;	
				
				console.log( chatH + '/' + chatInputH + '/' + chatBoxH + '/' + calcH);
				if(chatInputH > 99){
					$(this).css('overflow-y', 'auto');
				}else{
					$(this).css('overflow-y', 'hidden');
				}
				$('.search-navi').css('bottom',chatBoxH);
				$(this).css('height', '15px').height(this.scrollHeight);
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
	$('.draggable').draggable();
}

// 초기값 설정
function setDate(){
	$('.from').datepicker('setDate', '-1M'); 
	$('.to').datepicker('setDate', 'today'); 		
	fromDate = $(".from").val();
	toDate = $(".to").val();
	
	$('.calendar-area #from').val(fromDate); 
	$('.calendar-area #to').val(toDate); 

}