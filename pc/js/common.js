$(document).ready(function(){
	reHeight();
	sortable();
	//layerPop();
	draggable(); //��Ƽ�˾� �巹��
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

	/* ��� on/off */
	$('.btn-toggle-area button').click(function(){
		var header = $(this).closest('.header');
		if($(this).hasClass('on')){
			$(this).removeClass('on').text('���OFF');
			header.removeClass('on');
		}else{
			$(this).addClass('on').text('���ON');
			header.addClass('on');
		}
	});

	/* ���� ��� ��ư */
	$('.btn-toggle').click(function(){
		$(this).toggleClass('on');
	});


	/* �ǿ��� */	
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

	/* �˻��׺���̼� */
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


	/* Ŭ���� ���� */
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


	/* 1:1��㳻�� �˻� show/hide */
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

	/* datepicker - ���ϰ˻� */
	$( ".single-calendar .single" ).datepicker({
		showOn: "button",
		buttonImage: "../images/icon/icon_20_date.png",
		buttonImageOnly: true,
		dateFormat: "yy-mm-dd", 	
		changeMonth: true,
		changeYear: true,		
		minDate: '-100y',
		nextText: '���� ��', 
		prevText: '���� ��', 
		numberOfMonths:1, 		 
		showMonthAfterYear: true ,   
		dayNamesMin: ['��', 'ȭ', '��', '��', '��', '��', '��'], 
		monthNamesShort: ['1��','2��','3��','4��','5��','6��','7��','8��','9��','10��','11��','12��'],
		beforeShowDay: function(date){
			if (date > new Date())
				return [false];
			return [true];
		}
	  });

	/* datepicker - �Ⱓ�˻� */
	var dateFormat = "yy-mm-dd",
	from = $(".from").datepicker({		
		dateFormat: "yy-mm-dd", 	
		changeMonth: true,
		changeYear: true,		
		minDate: '-100y',
		nextText: '���� ��', 
		prevText: '���� ��', 
		numberOfMonths:1, 		 
		showMonthAfterYear: true ,   
		dayNamesMin: ['��', 'ȭ', '��', '��', '��', '��', '��'], 
		monthNamesShort: ['1��','2��','3��','4��','5��','6��','7��','8��','9��','10��','11��','12��'],

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
		nextText: '���� ��', 
		prevText: '���� ��', 
		numberOfMonths:1, 		 
		showMonthAfterYear: true ,   
		dayNamesMin: ['��', 'ȭ', '��', '��', '��', '��', '��'], 
		monthNamesShort: ['1��','2��','3��','4��','5��','6��','7��','8��','9��','10��','11��','12��'],
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
	setDate(); // �ʱⰪ ����
 

	$('.btn-cal').click(function(){
		$(this).closest('.multi-cal-area').find('.multi-cal-layer').addClass('on');
	});
	$('.btn-cal-close').click(function(){
		$(this).closest('.multi-cal-area').find('.multi-cal-layer').removeClass('on');
	});
	

});


$(window).on('load', function(){
	rdoCheck(); // ����,üũ�ڽ�


	//���̾��˾� (���� + �������)
	$(document).on('click', '.btnPop', function(){    
        $(this).addClass('on');
        $('html').addClass('popOpen');

        var name = $(this).attr('data-title');
        $('.layer-popup[data-layer-name=' + name + ']').fadeIn(100, function(){          
            $(this).addClass('open').closest('.layer-popup').prepend('<div class="dimmed">');
			layerPop();
        });		
    });
	/* �˾��ݱ� */
    $(document).on('click', '.popClose,.dimmed', function(){      
	 	$(this).closest('.layer-popup').removeClass('open').scrollTop(0).fadeOut(300, function(){
		$('.btnPop.on').focus().removeClass('on');
		$(this).closest('.layer-popup').find('.dimmed').remove();
		$('html').removeClass('popOpen');
		});			
    });
	

	//���̾��˾� (����� ���� ����)
	$(document).on('click', '.btnPopFixed', function(){
		layerPopFixed();
		$(this).addClass('on');

		var name = $(this).attr('data-title');
        $('.layer-popup-fixed[data-layer-name=' + name + ']').fadeIn(100, function(){          
            $(this).addClass('open').closest('.layer-popup');
			layerPopFixed();
        });
	});
	/* �˾��ݱ� */
	$(document).on('click', '.popClose', function(){      
		$(this).closest('.layer-popup-fixed').removeClass('open').scrollTop(0).fadeOut(300, function(){
			$('.btnPopFixed.on').focus().removeClass('on');
			$(this).closest('.layer-popup-fixed').css('inset', '');		
		});			
	});


	//�佺Ʈ�˾� (�ϴܿ��� �����̵�)
	$('.btnToest').click(function(){
		var name = $(this).attr('data-title');
		var chatBoxH =  $('.chat-box').outerHeight();
		
		$('.toest-popup[data-layer-name=' + name + ']').css('bottom', '-1px').addClass('on');
	
		if(name == "Toest02"){
			$('.toest-popup[data-layer-name="Toest02"].on').css('bottom',chatBoxH);
			$(this).addClass('on');
			$('.chat-box').addClass('quick').find('textarea').attr('placeholder','���� ���� ������ ������ �ּ���');
		}
	});
	/* �˾��ݱ� */
	$(document).on('click', '.toestClose', function(){     
		var name = $(this).closest('.toest-popup').attr('data-layer-name');
		$(this).closest('.toest-popup').hide().css('bottom','-100%').removeClass('on').css('display','');		
		if(name == 'Toest02'){
			$('.btn-quick-text').removeClass('on');
			$('.chat-box').removeClass('quick').find('textarea').attr('placeholder','�޽��� �Է�(Enter�� �޽��� �߼۵�)');			
		}	
	 });

	 /* ����Ʈ Ŭ���� �˾� �ݱ� */
	 $(document).on('click', '.send-list.type2 a', function(){
		$(this).closest('.toest-popup').hide().css('bottom','-100%').removeClass('on').css('display','');	
		// $('.btn-quick-text').removeClass('on');
		$('.chat-box').removeClass('quick');	
		
	 });

   
	 //����߼� �̸����� / ������� ���̾�
	 $('.btnPopBorder').click(function(){
		var name = $(this).attr('data-title');
		
		if(name == 'link-preview'){ ///����߼� �̸����� 
			var sHeight = window.innerHeight; 
			var oHeight = $('.layer-popup-border[data-layer-name=' + name + ']').height() + 36; //Ǫ�ͳ���
			var divTop = $(this).closest('li').offset().top; 
			
			$('.layer-popup-border').removeClass('on');				
			$(this).closest('li').addClass('select').siblings('li').removeClass('select');
			
			if( divTop + oHeight > sHeight ){	
				$('.layer-popup-border[data-layer-name=' + name + ']').css({
					"top": '',
					"bottom": 0			
				})
			}else{
				$('.layer-popup-border[data-layer-name=' + name + ']').css({
					"top": divTop -80,
					"bottom": ''
				})		
			}
		}	
		$('.layer-popup-border[data-layer-name=' + name + ']').addClass('on');
	 });
	 /*�ݱ�*/
	 $(document).on('click', '.popCloseBorder', function(){
		var name = $(this).closest('.layer-popup-border').attr('data-layer-name');		
		$('.layer-popup-border[data-layer-name=' + name + ']').removeClass('on');	
	 });


	
	


});

$(window).resize(function(){	
	layerPop();	
	
});

$(window).scroll(function(){
	
});



// ����,üũ�ڽ�
function rdoCheck(){
    $('input[type=radio].styled, input[type=checkbox].styled').each(function(){
        if(!$(this).parent().hasClass('chkbox')){
            $(this).wrap('<span class="chkbox"></span>');
            var $chk = $(this).closest('.chkbox');
            $chk.append('<span class="chk"></span>');
        }
    });
}


// ���̾��˾� ��ġ����
function layerPop(){
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

// ���̾��˾� ���� ��ġ����
function layerPopFixed(){
    $('.layer-popup-fixed').each(function(){
		var parentName = $(this).attr('data-layer-name');
		var posLeft = $('.main-chat').find('.'+parentName).position().left;
		var posTop = $('.main-chat').find('.'+parentName).position().top;
		console.log(posLeft);
		if(!$(this).hasClass('open')){
			$(this).css('left',posLeft);
			$(this).css('top',posTop);
		}
    });
}


//1:1��� ������ ���� ����
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
				var calcH  = chatH - chatInputH;	
				
				console.log( chatH + '/' + chatInputH + '/' + chatBoxH + '/' + calcH);
				if(chatInputH > 99){
					$(this).css('overflow-y', 'auto');
				}else{
					$(this).css('overflow-y', 'hidden');
				}
				$('.toest-popup[data-layer-name="Toest02"].on').css('bottom',chatBoxH);
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
	$('.draggable').draggable();
}

// �ʱⰪ ����
function setDate(){
	$('.from').datepicker('setDate', '-1M'); 
	$('.to').datepicker('setDate', 'today'); 		
	fromDate = $(".from").val();
	toDate = $(".to").val();
	
	$('.calendar-area #from').val(fromDate); 
	$('.calendar-area #to').val(toDate); 

}