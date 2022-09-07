$(document).ready(function(){
	reHeight();


/* 탭영역 */
$(document).on('click', '.tab-item', function(){
	var tabItem = $(this);
	var idx = $(this).index();	
	var tabConts = $(this).closest('.tab-lst').next('.tab-conts');
	if(!tabItem.hasClass('on')){
		tabItem.addClass('on').siblings('.tab-item').removeClass('on');
		tabConts.children('.tab-cont').hide().removeClass('on').eq(idx).fadeIn(200).addClass('on');
	}
});


/* datepicker */
$('.cal').each(function(){
	$(this).find('input').datepicker({
		dateFormat: "yy-mm-dd", 		  
		showOn: "both",
		buttonImage: "../../images/icon/icon_20_date.png", 
		buttonImageOnly: true, 
		changeMonth: false, 
		changeYear: false, 
		minDate: '-100y',
		nextText: '다음 달', 
		prevText: '이전 달', 
		numberOfMonths:1, 		 
		dayNamesMin: ['Su','Mo','Tu','We','Th','Fr','Sa'],
		showOtherMonths:true,
	});
	 //경로 변경시
	if($(this).closest('.calendar-area').hasClass('src')){	
		$('img.ui-datepicker-trigger').attr('src' , '../../../images/icon/icon_20_date.png');
	}
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
            $(this).addClass('open').closest('.layer-popup').prepend('<div class="dimmed">');;
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



/* 라디오,체크박스*/
function rdoCheck(){
    $('input[type=radio].styled, input[type=checkbox].styled').each(function(){
        if(!$(this).parent().hasClass('chkbox')){
            $(this).wrap('<span class="chkbox"></span>');
            var $chk = $(this).closest('.chkbox');
            $chk.append('<span class="chk"></span>');
        }
    });
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

// 레이어팝업 닫기
function popClose(){
   var spd = '300';
    $('.layer-popup').each(function(){
        $(this).removeClass('open').fadeOut(spd, function(){
            $('.btnPop.on').focus().removeClass('on');            
        });
    });
    setTimeout(function(){
        $('html').removeClass('popOpen');
    }, spd);	

}

//1:1상담 컨텐츠 높이 변경
function reHeight(){
	$('.reHeight').each(function(){
	autoHeight();
	$(this).on('keydown keyup', function(){
		autoHeight();
	});

	function autoHeight(){
		$('.chat-box textarea').each(function(){
			var chatCont = $(this).closest('.chat-wrap').find('.chat-cont');
			var chatH = $('.chat-wrap').outerHeight();
			var chatInputH = $('.chat-box').find('textarea').outerHeight();
			var calcH  = chatH - chatInputH;

			if(chatInputH > 399){
				$(this).css('overflow-y', 'auto');
			}else{
				$(this).css('overflow-y', 'hidden');
			}
			$(this).css('height', 'auto').height(this.scrollHeight);
			chatCont.css('height', calcH ).scrollTop(chatCont[0].scrollHeight);

		});
	}
});
}
