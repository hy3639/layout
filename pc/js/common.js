$(document).ready(function(){
	//contHeight();
/*======= 공통 (레이아웃) ======= */





/*=======// 공통 (레이아웃) ======= */

/*======= 탭 ======= */
/* 탭영역 */
$(document).on('click', '.tab-item .btn', function(){
	var idx = $(this).closest('.tab-item').index();	
	if(!$(this).closest('.tab-item').hasClass('on')){
		$(this).closest('.tab-item').addClass('on').siblings('.tab-item').removeClass('on');
		$(this).closest('.tab-lst').next('.tab-conts').children('.tab-cont').hide().removeClass('on').eq(idx).fadeIn(200).addClass('on');
	}
});


/*=======// 탭 ======= */


/*======= 달력 ======= */

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
/*=======// 달력 ======= */

	
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
/*======= 디자인스크롤 ======= */
/* 일반 스크롤 */
	$(".scroll-area").mCustomScrollbar({
		mouseWheelPixels : 50, 
		scrollInertia:0,
	});
	$(".scroll-area").resizable();



	/* textarea 스크롤 */
	var textareaLineHeight=parseInt($(".textarea-wrapper textarea").css("line-height"));
				
	$(".textarea-wrapper").mCustomScrollbar({
		 scrollInertia:0,
		 mouseWheelPixels : 50,
		// theme:"dark-3",
		advanced:{autoScrollOnFocus:false},
		mouseWheel:{disableOver:["select","option","keygen","datalist",""]},
		keyboard:{enable:false},
		snapAmount:textareaLineHeight
	});
				

	var textarea=$(".textarea-wrapper textarea"),textareaWrapper=$(".textarea-wrapper"),textareaClone=$(".textarea-wrapper .textarea-clone");
	
	textarea.bind("keyup keydown",function(e){
		var $this=$(this),textareaContent=$this.val(),clength=textareaContent.length,cursorPosition=textarea.getCursorPosition();
		textareaContent="<span>"+textareaContent.substr(0,cursorPosition)+"</span>"+textareaContent.substr(cursorPosition,textareaContent.length);
		textareaContent=textareaContent.replace(/\n/g,"<br />");
		textareaClone.html(textareaContent);
		$this.css("height",textareaClone.height());
		var textareaCloneSpan=textareaClone.children("span"),textareaCloneSpanOffset=0,
			viewLimitBottom=(parseInt(textareaClone.css("min-height")))-textareaCloneSpanOffset,viewLimitTop=textareaCloneSpanOffset,
			viewRatio=Math.round(textareaCloneSpan.height()+textareaWrapper.find(".mCSB_container").position().top);
		if(viewRatio>viewLimitBottom || viewRatio<viewLimitTop){
			if((textareaCloneSpan.height()-textareaCloneSpanOffset)>0){
				textareaWrapper.mCustomScrollbar("scrollTo",textareaCloneSpan.height()-textareaCloneSpanOffset-textareaLineHeight);
			}else{
				textareaWrapper.mCustomScrollbar("scrollTo","top");
			}
		}
	});
	
	$.fn.getCursorPosition=function(){
		var el=$(this).get(0),pos=0;
		if("selectionStart" in el){
			pos=el.selectionStart;
		}else if("selection" in document){
			el.focus();
			var sel=document.selection.createRange(),selLength=document.selection.createRange().text.length;
			sel.moveStart("character",-el.value.length);
			pos=sel.text.length-selLength;
		}
		return pos;
		
	}


	
	
/*=======// 디자인스크롤 ======= */


});

$(window).resize(function(){	
	layerPop(); //레이어팝업	
	//contHeight();

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

//컨텐츠 높이 최소값 지정
// function contHeight(){
	
// 	var winH = $( window ).outerHeight();
// 		//console.log(winH);
// 		if(winH < 850){
// 			$('.content.flex').css('height', 850);
			
			
// 		}else{
// 			$('.content.flex').css('height', 'auto');
			
// 		}
// }