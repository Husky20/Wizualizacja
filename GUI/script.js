//@TODO podswietalnie filmow po najechaniu na rok (najblizszy najlepszy i wszystkie z gatunku najlepszego)
//@TODO ilosc filmow przy ich gatunkach

function wizualizacja(){
	var xWidokDrugi = 14/27750000;
	var ywidokDrugi = 750000;
 	var domyslnaWielkoscKulek = 4;
	var przesuniecie_y_kolek_na_dole = 670;
	var mnoznikGatunkow = 0;//kolor gatunku, czesto wykorzystywana zmienna globalna TAK NIE POWINNO SIE ROBIC
		var kolorBazowy = 124;
		var mnoznikDoGatonkow =0;//zmienna globalna wykorzystywana w jednej funkcji bo tak bylo mi wygodnie
		var dane;
	const MNOZNIK = {
			'akcja': function () { it = 5; return 8010;},
			'dramat': function () { return 1;},
			'fantasy': function () { return 1.5;},
			'horror': function () { return 2;},
			'komedia': function () { return 7.5;},
			'kryminalny': function () { return 3;},
			'scifi': function () { return 3553;},
			'western': function () { return 4;},
			'melodramat': function () { return 1208;},
			'thriller': function () { return 5;},
			'animacja': function () { return 5.5;},
			'wojenny': function () { return 6;},
			'obyczajowy': function () { return 6.5;},
			'sensacyjny': function () { return 1220;},
			'etiuda': function () { return 2.5;},
			'dokumentalny': function () { return 8;},
		};
	d3.csv("http://127.0.0.1:8887/filmy.csv",).then(function(dane){
		var trybFilmow = 1; //rodzaj wyswietlania filmow
		start();

	function mnGatunku(gatunek){
		try{
			mnoznikGatunkow = MNOZNIK[gatunek]();
			return  mnoznikGatunkow;
		} catch{
			return 0;
		}
		
		
		
	}

	function filmy(){
		mnoznikGatunkow=0;
		
		for(let i=0; i<dane.length; i++){
					var x=50 + (dane[i].rok-1915)*(1400/104);
					var y = 600 - dane[i].ocena*(55);
				if(trybFilmow==2){
					x=50+dane[i].boxoffice*xWidokDrugi;
					y=600-dane[i].budzet/ywidokDrugi;
				}
				if((dane[i].boxoffice - dane[i].budzet)>=0){
					d3.select("svg")//filmy
						.append("circle")
						.attr("id", dane[i].gatunek+i)
						.attr("r", domyslnaWielkoscKulek + Math.sqrt(dane[i].boxoffice -    dane[i].budzet)/5000)//rozmiar
						.attr("cx", x)
						.attr("cy", y)
						.style("fill", "#"+ mnoznikGatunkow*kolorBazowy)
						.on('mouseover',function() {
							etykieta(dane[i]);})
						.on('mouseout',function () {
							d3.selectAll("#etykieta").remove();})
				}
				else{
				d3.select("svg")//filmy
					.append("circle")
					.attr("id", dane[i].gatunek+i)
					.attr("r", domyslnaWielkoscKulek)//rozmiar
					.attr("cx", x)
					.attr("cy", y)
					.style("fill","#"+ mnoznikGatunkow*kolorBazowy)
					.on('mouseover',function() {
						etykieta(dane[i]);})
					.on('mouseout',function () {
						d3.selectAll("#etykieta").remove();})//kolor kolek
					d3.select("svg")//filmy
					.append("circle")
					.attr("id", dane[i].gatunek+i)
					.attr("r", domyslnaWielkoscKulek-1.5 )//rozmiar
					.attr("cx", x)
					.attr("cy", y)
					.style("fill","#"+ 222);
				}
			}
	}

	function gatunki(){
		film(0, 8010,"akcja");
		film(1, 1,"dramat");
		film(2, 1.5,"fantasy");
		film(3, 2,"horror");
		film(4, 7.5,"komedia");
		film(5, 3,"kryminalny");
		film(6, 3553,"scifi");
		film(7, 4,"western");
		film(8, 1208,"melodramat");
		film(9, 5,"thriller");
		film(10, 5.5,"animacja");
		film(11, 6,"wojenny");
		film(12, 6.5,"obyczajowy");
		film(13, 1220,"sensacyjny");
		film(14, 2.5,"etiuda");
		film(15, 8,"dokumentalny");
	}
	function wszystkie_budzety_filmy(){
		mnoznikDoGatonkow = 0;
		dict_return = {}
		i = 0;
		for(let id = 0; id <= 10; id ++){
			let odpowiedz =  filmy_w_budzet(id *4);
			film(id, mnGatunku(odpowiedz[0]), odpowiedz[0], 160, 750, Math.round(odpowiedz[1], 'e+2'), Math.round(id *4 - 2.5, 'e+2'), Math.round(id * 4+2.5, 'e+2'));
			
		}
	}

	function filmy_w_budzet(budzet){
		//zwrac najlepszy gatunek i jego srednia stope zwrotu

		let mln = 10000000;
		let dict = {};
		let dict_stosunek = {}; 
		dane.forEach(film_it => {
			if((film_it.budzet / mln) >= (budzet-2.5) && (film_it.budzet / mln )<= (budzet+2.5)){
				if(film_it.boxoffice > 0) {
					dict[film_it.gatunek] ++;
					if(film_it.budzet === 0){
						dict_stosunek[film_it.gatunek] += film_it.boxoffice/film_it.budzet;
					}
					if(!dict[film_it.gatunek]){
						dict[film_it.gatunek] = 1;
						if(film_it.budzet === 0){
							dict_stosunek[film_it.gatunek] = 0;
						} else {
							
							dict_stosunek[film_it.gatunek] = (film_it.boxoffice/film_it.budzet);
						}
						
					}
				}
			}
		});

		let najlepszy = ["", 0];
		let gatunek = "";
		
		for (const gatunek in dict)
		{
			let stosunek = dict_stosunek[gatunek];//box_offic/budzet/ilosc
			if(stosunek > najlepszy[1]){
				najlepszy[0] = gatunek;
				najlepszy[1] = stosunek;
			} 
		}
		return najlepszy;
	}

	function ilosc_filmow_z_gatunku(gatunek){
		let ilosc = 0;
		for(let film_id = 0; film_id<dane.length; film_id++){
			if(gatunek == dane[film_id].gatunek){
				ilosc++;
			}
		}
		return ilosc;
	}
	
	function najlepsze_w_roku(wybrany_rok){
		var najlepszy = dane[0];
		var najblizszy = 1000;
		for(let film_id=0; film_id<dane.length; film_id++){
			if(Math.abs(dane[film_id].rok - wybrany_rok) < najblizszy) {
				najblizszy = Math.abs(dane[film_id].rok - wybrany_rok);
				najlepszy = dane[film_id];
			} else if(Math.abs(dane[film_id].rok - wybrany_rok) == najblizszy &&  najlepszy.ocena < dane[film_id].ocena ){
				najlepszy = dane[film_id];
			}
		}
		return najlepszy;
	}

	function cilic(tex){	//d3.selectAll("#"+tex).style("fill",styl*kolorBazowy);
		for(let i=0; i<dane.length; i++){
			if(tex!=dane[i].gatunek){
			let mnoznikGatunkow = mnGatunku(dane[i].gatunek);
			d3.selectAll("#"+dane[i].gatunek +i)
				.style('fill',"#"+ mnoznikGatunkow*kolorBazowy)
				.transition()
				.duration(1250)
				.style("fill", "#"+333);
			}
			
		}
	}

	function offcilic(tex){
		for(let i=0; i<dane.length; i++){
			if(tex!=dane[i].gatunek){
				let mnoznikGatunkow = mnGatunku(dane[i].gatunek);
				d3.selectAll("#"+dane[i].gatunek +i)
					.style('fill',"#"+333)
					.transition()
					.duration(1250)
					.style("fill", "#"+mnoznikGatunkow*kolorBazowy);
					
			}
		}
	}

	function film(i, styl ,gatunek , mnoznik_przesuniecia_w_prawo = 120, plus_przesuniecie_w_prawo = 0, ilosc = ilosc_filmow_z_gatunku(gatunek), budzet_od = 0, budzet_do = 0){
		if(i%4==0)
			mnoznikDoGatonkow++;
		i = i - mnoznikDoGatonkow*4 + 4;
		d3.select("svg")//filmy
				.append("circle")
				.attr("id","gatunek")
				.attr("r", domyslnaWielkoscKulek+5)//rozmiar
				.attr("cx", mnoznikDoGatonkow*mnoznik_przesuniecia_w_prawo + plus_przesuniecie_w_prawo)
				.attr("cy", przesuniecie_y_kolek_na_dole+i*25)
				.style("fill","#"+  styl*kolorBazowy)
				.on('mouseover',function() {
					cilic(gatunek);
					})//rozjasnienie wybranych
				.on('mouseout',function () {
					offcilic(gatunek);
					})//od nowa wywolanie calej funkcji test przez co ryzuje sie wszystko	
		d3.select("svg")//liczy ocen
				.append("text")
				.attr("x", mnoznikDoGatonkow * mnoznik_przesuniecia_w_prawo + 15 + plus_przesuniecie_w_prawo)
				.attr("y", przesuniecie_y_kolek_na_dole+i*25)
				.attr("fill", "grey")
				.attr("font-size", 15)
				.text(gatunek + " " + ilosc )
				.on('mouseover',function() {
					cilic(gatunek);
					})//rozjasnienie wybranych
				.on('mouseout',function () {
					offcilic(gatunek);
					})
		if(budzet_od != 0 || budzet_do != 0){
			if(i%4==0){
				d3.select("svg")//liczy ocen
				.append("text")
				.attr("x", mnoznikDoGatonkow * mnoznik_przesuniecia_w_prawo + plus_przesuniecie_w_prawo -55 )
				.attr("y", przesuniecie_y_kolek_na_dole -20)
				.attr("fill", "grey")
				.attr("font-size", 15)
				.text("budzet - gat. box/bdz" )
			}


			d3.select("svg")//liczy ocen
				.append("text")
				.attr("x", mnoznikDoGatonkow * mnoznik_przesuniecia_w_prawo + plus_przesuniecie_w_prawo -55 )
				.attr("y", przesuniecie_y_kolek_na_dole+i*25)
				.attr("fill", "grey")
				.attr("font-size", 15)
				.text(budzet_od + "-" + budzet_do )
		}			
	}

	function etykieta(tab){
		if(trybFilmow==1){
		var x=50 + (tab.rok-1915)*(1400/104);
		var y = 600 - tab.ocena*(55);
		}	
		else if(trybFilmow==2){
			x=50+tab.boxoffice*xWidokDrugi;
			y=600-tab.budzet/ywidokDrugi;
		}			
		if((x+175)>1500) x-=170;
		
		d3.select("svg")
		.append("rect")
		.attr("id","etykieta")
		.attr("height", 110)
		.attr("width", 180)
		.attr("x", x+5)
		.attr("y", y-5)
		.style("fill","#"+ 444);
		
		d3.select("svg")
		.append("rect")
		.attr("id","etykieta")
		.attr("height", 100)
		.attr("width", 170)
		.attr("x", x+10)
		.attr("y", y)
		.style("fill","#"+ 111);
		var z1=1;
		
		if(tab.tytul.length >= 27){
			tex("Tytul: " +tab.tytul.substring(0,26),z1);
			tex(tab.tytul.substring(26,50),++z1);
		}
		else
			tex("Tytul: " +tab.tytul,z1);
		tex("Rok: "+tab.rok,++z1);
		if(tab.ocena==0)
			tex("Ocena: brak informacji",++z1);
		else	
			tex("Ocena: "+tab.ocena,++z1);
		tex("Gatunek: "+tab.gatunek,++z1);
		if(tab.budzet==0)
			tex("Budzet: brak informacji",++z1);
		else
			tex("Budzet (w USD): "+tab.budzet,++z1);
		if(tab.boxoffice==0)
			tex("Box office: brak informacji",++z1);
		else
			tex("Box office (w USD): "+tab.boxoffice,++z1);
		
		function tex(n, mnoznikGatunkow){
			d3.select("svg")//godziny na osi
			.append("text")
			.attr("font-family", "Arial")
			.attr("id","etykieta")
			.attr("x", x+15)
			.attr("y", (y+mnoznikGatunkow * 15))
			.attr("fill", "darkgreen")
			.attr("font-size", 10)
			.text(n);
		}
	}

	function usunOznaczenia(){
		d3.selectAll("#gatunek").remove();
		d3.selectAll("text").remove();
		mnoznikDoGatonkow = 0;
		gatunki();
	}

	function przycisk(tex,f){
		d3.select("svg")

		.append("rect")
		.attr("id", "przycisk")
		.attr("height", 50)
		.attr("width", 150)
		.attr("x", 600)
		.attr("y", 650)
		.style("fill","#"+ 222)
			.on("click", mouseClick);
			function mouseClick() {
				if(f == 2){
				usunOznaczenia();
				oznaczenia("mln","mln",2);
				budzet_box_office();
				}
			else if(f == 3){
				usunOznaczenia();
				oznaczenia("rok","ocena",1);
				ocena_rok();
			}
		}
		d3.select("svg")//text
			.append("text")
			.attr("x", 675)
			.attr("font-family", "Arial")
			.attr("y", 680)
			.attr("fill", "darkorange")
			.attr("font-size", 20)
			.attr("text-anchor", "middle")
			.text(tex)
			.on("click", mouseClick);
			function mouseClick() {
				if(f == 2){
				usunOznaczenia();
				oznaczenia("mln","mln",2);
				budzet_box_office();
				}
			else if(f == 3){
				usunOznaczenia();
				oznaczenia("rok","ocena",1);
				ocena_rok();
			}
		}
	}
	function linie(){
		d3.select("svg")//linia Y
				.append("line")
				.attr("x1", 50)
				.attr("y1", 50)
				.attr("x2", 50)
				.attr("y2", 600)
				.style("stroke", "black")
				.style("stroke-width", "3px");
						
			d3.select("svg")//linia X
				.append("line")
				.attr("x1", 50)
				.attr("y1", 600)
				.attr("x2", 1450)
				.attr("y2", 600)
				.style("stroke", "black")
				.style("stroke-width", "3px");
		for(let i=0; i<105; i++){
			d3.select("svg")//linia X
				.append("line")
				.attr("x1", 50+i*(1400/104))
				.attr("y1", 600)
				.attr("x2", 50+i*(1400/104))
				.attr("y2", 50)
				.style("stroke", "black")
				.style("stroke-width", "1px");	
		}
		for(let i=1; i<11; i++){
			d3.select("svg")//linia y
				.append("line")
				.attr("x1", 50)
				.attr("y1", 600-i*55)
				.attr("x2", 1450)
				.attr("y2", 600-i*55)
				.style("stroke", "white")
			.style("stroke-width", "0.25px");
		}	
	}

	
	function lata_na_osi(rok, id){
		let gatunek_najlepszego_filmu_w_roku = najlepsze_w_roku(rok).gatunek;
		d3.select("svg")//lata na osi
		.append("text")
		.attr("id", "lata" + id)
		.attr("x", 40)
		.attr("y", 620)
		.attr("fill", "darkgreen")
		.attr("font-size", 10)
		.text(rok)//.text(i+1915);//pomocniczaF w tym przypadku to wybrany rok
		.on('mouseover',function() {
			cilic(gatunek_najlepszego_filmu_w_roku);})
		.on('mouseout',function () {
			offcilic(gatunek_najlepszego_filmu_w_roku);})
	}

	function ocena_na_osi(ocena, id){
		d3.select("svg")//liczy ocen
		.append("text")
		.attr("id", "ocena" + id)
		.attr("x", 30)
		.attr("y", 600)
		.attr("fill", "darkgreen")
		.attr("font-size", 15)
		.text(ocena);//.text(i);
	}

	function box_office_na_osi(box_offic, id){
		d3.select("svg")//lata na osi
		.append("text")
		.attr("id", "lata" + id)
		.attr("x", 40)
		.attr("y", 620)
		.attr("fill", "darkgreen")
		.attr("font-size", 10)
		.text(box_offic);//.text(i+1915);//pomocniczaF w tym przypadku to wybrany rok
	}

	function budzet_na_osi(budzet, id){
		d3.select("svg")//liczy ocen
		.append("text")
		.attr("id", "ocena" + id)
		.attr("x", 30)
		.attr("y", 600)
		.attr("fill", "darkgreen")
		.attr("font-size", 15)
		.text(budzet)//.text(i);
		.on('mouseover',function() {
			cilic(filmy_w_budzet(budzet)[0]);})
		.on('mouseout',function () {
			offcilic(filmy_w_budzet(budzet)[0]);})
	}


	function oznaczenia(texX,texY,tryb){//lata + i, oceny + i, rok, ocena
		if(tryb%2 == 0){
			wszystkie_budzety_filmy();
		}
		var pomocniczaF = 0; 			
		for(let i=0; i<105; i++){
			if(tryb==2){
				pomocniczaF = i*27;
				if(i%2==0){
					box_office_na_osi(pomocniczaF, i)	
					
				}	
			}	else {
				pomocniczaF = 1915+i;
				if(i%2==0){
					lata_na_osi(pomocniczaF, i)	
	
				}		
			}
					
		} 
		d3.select("svg")//literka "rok"
			.append("text")
			.attr("id","rok")
			.attr("x", 50+1400+20)
			.attr("y", 620)
			.attr("fill", "darkgreen")
			.attr("font-size", 15)
			.text(texX);//.text("rok");
		
		for(let i=0; i<11; i++){
			if(tryb==2){
				pomocniczaF = i*4;
				budzet_na_osi(pomocniczaF, i);
			} else {
				pomocniczaF = i;
				ocena_na_osi(pomocniczaF, i);
			}
			
					
		}  

		d3.select("svg")//napis "ocena"
			.append("text")
			.attr("id","ocena")
			.attr("x", 30)
			.attr("y", 15)
			.attr("fill", "darkgreen")
			.attr("font-size", 15)
			.text(texY);//.text("ocena");
			//d3.select("#lata"+0).remove();		
			for(let i=0; i<105; i++){
				d3.selectAll("#lata"+i)
					.transition()
					.duration(2000)
					.attr("x", 40+i*(1400/104))
					.attr("y", 620);
			}
			for(let i=0; i<11; i++){
				d3.selectAll("#ocena"+i)
					.transition()
					.duration(2000)
					.attr("x", 30)
					.attr("y", 600-i*55);
			}
	}

	function start(){
		var gatunek = parseInt(gatunek,2);
		gatunki();	
			d3.selectAll("#przycisk").remove();
				przycisk("Zyski",2)

		oznaczenia("rok","ocena",1915,0);
		linie();
		filmy();
	}

	function budzet_box_office(){
		trybFilmow=2;
			for(let i=0; i<dane.length; i++){
				d3.selectAll("#" + dane[i].gatunek+i)
					.transition()
					.duration(2000)
					.attr("cx", 50+dane[i].boxoffice*xWidokDrugi)
					.attr("cy", 600-dane[i].budzet/ywidokDrugi);
		}
		przycisk("Ocena",3);
	}

	function ocena_rok(){
		trybFilmow=1;
		for(let i=0; i<dane.length; i++){
				d3.selectAll("#" + dane[i].gatunek+i)
					.transition()
					.duration(1000)
					.attr("cx", 50 + (dane[i].rok-1915)*(1400/104))
					.attr("cy", 600 - dane[i].ocena*(55));
		}
			przycisk("Zyski",2);
	}
	});
}
