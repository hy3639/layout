$(document).ready(function(){
	reHeight();
	sortable();
//	layerPop();
	draggable(); //��Ƽ�˾� �巹��
	// setDate();

	/*gnb*/
	$('.btn-gnb').click(function(){
		var gnbList = $(this).next('.gnb-list');
		$(this).addClass('on');
		gnbList.fadeIn('300');	
	});
	$('.btn-gnb-close').click(function(){
		$(this).removeClass('on');
			$(this).closest('.gnb-list').fadeOut('100');
	});


	/* ��� on/off */
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

	/* ���� ��� ��ư */
	$('.btn-toggle').click(function(){
		$(this).toggleClass('on');
	});

	/* ��ư 1�����ý� ��Ÿ�� */
	$('.radio-select > button').click(function(){
		$(this).addClass('on').siblings().removeClass('on');
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
	$( ".single-cal-layer .single" ).datepicker({
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
		monthNamesShort: ['01','02','03','04','05','06','07','08','09','10','11','12'],
		beforeShowDay: function(date){
			if (date > new Date())
				return [false];
			return [true];
		},
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
		nextText: '���� ��', 
		prevText: '���� ��', 
		numberOfMonths:1, 		 
		showMonthAfterYear: true ,   
		dayNamesMin: ['��', 'ȭ', '��', '��', '��', '��', '��'], 
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
		console.log(parentName);
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
	rdoCheck(); // ����,üũ�ڽ�

	//üũ�ڽ� �� ��Ÿ��
	$('input[type=checkbox].styled').change(function(){
		if(this.checked){
			$(this).closest('.chkbox').addClass('on');
		}else{
			$(this).closest('.chkbox').removeClass('on');
		}
	});

	//���� �� ��Ÿ��
	$('input[type=radio].styled').change(function(){
		var name = $(this).attr('name');
		if(this.checked){
			$('input[name="'+ name +'"]').closest('.chkbox').removeClass('on');
			$(this).closest('.chkbox').addClass('on');
		}
	});


	//����Ʈ ȭ��ǥ ��Ÿ��
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
	

	//���̾��˾� (���� + �������)
	$(document).on('click', '.btnPop', function(){    
        $(this).addClass('on');
        $('html').addClass('popOpen');

        var name = $(this).attr('data-title');
        $('.layer-popup[data-layer-name=' + name + ']').fadeIn(100, function(){          
            $(this).addClass('open').closest('.layer-popup').prepend('<div class="dimmed">');

			var hei = $(window).height();		
			var popH = $(this).find('.popup').outerHeight();
			var pdT = (hei - popH) / 2;
			var mgB = $(this).find('.popup').css('margin-bottom');
			var space = mgB.replace(/px/g, '') * 2;
		
		
			if($(this).hasClass('type2')){ // ������� ���̺� ����ִ� �˾� (window.height���� ������ ������� ������)				
				var popHeader = 0;
				// var popBottom = 0;
				var popPadding = $(this).find('.popup').css('padding-top').replace(/px/g, '') * 2;
				var popHeader = $(this).find('.popup-header').outerHeight();
				var tblFixedHeader =$(this).find('.fix-th').outerHeight();
				var layerCont = $(this).find('.fix-head');
				var tableBody = $(this).find('table').outerWidth();
			
				// if($(this).find('.bottom-area').length){			
				// 	var popBottom = $(this).find('.bottom-area').outerHeight();			
				// }						
				var sum = hei - (popPadding + popHeader + tblFixedHeader + 16); // ���� ��ũ�ѿ��� ���(layer-cont paddingT/B(16) ����)					
				layerCont.css('max-height', sum); // ��ũ�ѿ��� ���̰�

				$(this).find('.fix-th.type1').css('width', tableBody); 
				$(this).find('.fix-th.type2 > div').css('width', tableBody);
			
				if(hei < popH){
					$(this).find('.popup').css('height', '100vh');
					$(this).find('.fix-th.type1').css('width', tableBody - 17);  //��ũ�� �������� ��ũ�� �ʺ�(17)��ŭ ����
					$(this).find('.fix-th.type2 > div').css('width', tableBody - 8.5);		 
				}else if(hei > popH){
					 $(this).css({'padding-top':pdT});
				}
		
			}else{	// �⺻ ���̾��˾�		
				if(hei - space < popH){
					$(this).css({'padding-top':mgB});
				}else{
					$(this).css({'padding-top':pdT});
				}
			}
        });		
    });
	/* �˾��ݱ� */
    $(document).on('click', '.popClose,.dimmed', function(){      
	 	$(this).closest('.layer-popup').css('padding-top','').removeClass('open').scrollTop(0).fadeOut(300, function(){
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
		$('.chat-box').attr('style','');
		if(name == 'Toest02'){
			$('.btn-quick-text').removeClass('on');
			$('.chat-box').removeClass('quick').find('textarea').attr('placeholder','�޽��� �Է�(Enter�� �޽��� �߼۵�)');			
		}	
	 });

	 /* ����Ʈ Ŭ���� �˾� �ݱ� */
	 $(document).on('click', '.send-list.type2 a', function(){
		$(this).closest('.toest-popup').hide().css('bottom','-100%').removeClass('on').css('display','');
		$('.chat-box').removeClass('quick').attr('style','');
		
	 });

   
	 //��ġ���� ���̾�
	 $('.btnPopBorder').click(function(){
		var name = $(this).attr('data-title');
		$(this).addClass('on');
		
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
			$('.layer-popup-border[data-layer-name=' + name + ']').addClass('on');
		}else if(name=='graph'){ // �����Ȳ �׷����˾�	

			var sWidth = $('.wrapper').outerWidth();
			var winPos = $(window).scrollTop() +  $(window).outerHeight() - 78; //������� 78
			var targetDiv = $(this).closest('td');
			var targetLayer = $(this).closest('td').find('.layer-popup-border');			
			var posTop = targetDiv.position().top + 61;	//td���� + ���̾�� 61
			var posLeft = targetDiv.position().left;
			var layerW = targetDiv.find('.layer-popup-border').outerWidth();
			var layerH = targetDiv.find('.layer-popup-border').outerHeight();
			
			if($(this).parent().hasClass('row')){
				if(posTop + layerH > winPos) {
					targetLayer.css({				
						"bottom": 61,
						"right": 0,
						"top" : ''
					}).addClass('on');
				
				}else{
					targetLayer.css({				
						"top": 61,
						"right": 0,
						"bottom" :''
					}).addClass('on');				
				}				
			}else{
				if(posLeft + layerW > sWidth) {
					targetLayer.css({				
						"bottom": 61,
						"right": 0,
						"left": ''
					}).addClass('on');				
				}else{
					targetLayer.css({				
						"bottom": 61,
						"left": 0,
						"right": ''
					}).addClass('on');				
				}
			}
		}else{ // �Ϲ� ��ġ���� �˾�	
			$('.layer-popup-border[data-layer-name=' + name + ']').addClass('on');
		}
		
	 });
	 /*�ݱ�*/
	 $(document).on('click', '.popCloseBorder', function(){
		var name = $(this).closest('.layer-popup-border').attr('data-layer-name');	
	
		$('.layer-popup-border[data-layer-name=' + name + ']').removeClass('on');	
		$('.btnPopBorder[data-title=' + name + ']').removeClass('on');	
	 });


	//���콺���� ����
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

	


});

$(window).resize(function(){	
//	layerPop();	
	
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

			if(this.checked){
				$(this).closest('.chkbox').addClass('on');
			}else{
				$(this).closest('.chkbox').removeClass('on');
			}
        }
    });
}




// ���̾��˾� ���� ��ġ����
function layerPopFixed(){
    $('.layer-popup-fixed').each(function(){
		var parentName = $(this).attr('data-layer-name');
		var targetParent = $('.main-chat').find('.'+parentName);
		var sWidth = $('.wrapper').outerWidth();

		var posLeft = targetParent.position().left;
		var posRight = $('.wrapper').width() - (targetParent.position().left + targetParent.outerWidth());
		var posTop = targetParent.position().top;	

		if(!$(this).hasClass('open')){ // ������ �ʾ�����쿡�� ����
			if(posRight + targetParent.outerWidth() > sWidth ){  // �θ� position + width�� wrapper �ʺ� �̻��϶�
				$(this).find('.multi-cal-layer').css({				
					"left": 0,
					"right": ''
				})
				$(this).css({
					"top": posTop,
					"left": 0,
					"right": ''			
				})				
			}else if(posLeft == 0){ // �մ������� �� ������ �������
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
				
				//console.log( chatH + '/' + chatInputH + '/' + chatBoxH + '/' + calcH);
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

//�佺Ʈ �޽��� �˾� 
function toestTxt(){
	$('.toest-txt').fadeIn(400).delay(1000).fadeOut(400);
}


// ���̾��˾� ����
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



// �ʱⰪ ����
// function setDate(){
// 	$('.from').datepicker('setDate', '-1M'); 
// 	$('.to').datepicker('setDate', 'today'); 		
// 	fromDate = $(".from").val();
// 	toDate = $(".to").val();
	
// 	$('.calendar-area #from').val(fromDate); 
// 	$('.calendar-area #to').val(toDate); 

// }