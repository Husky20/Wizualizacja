function pierwsza(){
	var xWidokDrugi = 14/27750000;
	var ywidokDrugi = 750000;
 	var domyslnaWielkoscKulek = 4;
	var mnoznikGatunkow = 0;//kolor gatunku, czesto wykorzystywana zmienna globalna TAK NIE POWINNO SIE ROBIC
		var kolorBazowy = 124;
		var mnoznikDoGatonkow =0;//zmienna globalna wykorzystywana w jednej funkcji bo tak bylo mi wygodnie
		var dane;
	d3.csv("http://127.0.0.1:8887/filmy.csv",).then(function(dane){
		var trybFilmow = 1; //rodzaj wyswietlania filmow
		test();
function mGatunku(tab){
		if(tab.gatunek == 'akcja')
			mnoznikGatunkow=8010;
		else if( tab.gatunek == 'dramat')
			mnoznikGatunkow=1;
		else if(tab.gatunek == 'fantasy')
			mnoznikGatunkow=1.5;
		else if( tab.gatunek == 'horror')
			mnoznikGatunkow=2;
		else if( tab.gatunek == 'komedia')
			mnoznikGatunkow=2.5;
		else if( tab.gatunek == 'kryminalny')
			mnoznikGatunkow=3;
		else if(tab.gatunek == 'sci-fi')
			mnoznikGatunkow=3553;
		else if( tab.gatunek == 'western')
			mnoznikGatunkow=4;
		else if( tab.gatunek == 'melodramat')
			mnoznikGatunkow=1208;
		else if( tab.gatunek == 'thriller')
			mnoznikGatunkow=5;
		else if( tab.gatunek == 'animacja')
			mnoznikGatunkow=5.5;
		else if( tab.gatunek == 'wojenny')
			mnoznikGatunkow=6;
		else if( tab.gatunek == 'obyczajowy')
			mnoznikGatunkow=6.5;
		else if( tab.gatunek == 'sensacyjny')
			mnoznikGatunkow=1220;
		else if( tab.gatunek == 'etiuda')
			mnoznikGatunkow=7.5;
		else if( tab.gatunek == 'dokumentalny')
			mnoznikGatunkow=8;
}
function filmy(){
	mnoznikGatunkow=0;
	
for(let i=0; i<dane.length; i++){
			mGatunku(dane[i]);
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
				.style("fill",mnoznikGatunkow*kolorBazowy)
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
			.style("fill",mnoznikGatunkow*kolorBazowy)
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
			.style("fill",222);
		}
	}
}
function gatunki(){
	film(0, 8010,"akcja");
	film(1, 1,"dramat");
	film(2, 1.5,"fantasy");
	film(3, 2,"horror");
	film(4, 2.5,"komedia");
	film(5, 3,"kryminalny");
	film(6, 3553,"sci-fi");
	film(7, 4,"western");
	film(8, 1208,"melodramat");
	film(9, 5,"thriller");
	film(10, 5.5,"animacja");
	film(11, 6,"wojenny");
	film(12, 6.5,"obyczajowy");
	film(13, 1220,"sensacyjny");
	film(14, 7.5,"etiuda");
	film(15, 8,"dokumentalny");
}
function cilic(tex){	//d3.selectAll("#"+tex).style("fill",styl*kolorBazowy);
				for(let i=0; i<dane.length; i++){
					if(tex!=dane[i].gatunek){
					mGatunku(dane[i]);
					d3.selectAll("#"+dane[i].gatunek +i)
						.style('fill',mnoznikGatunkow*kolorBazowy)
						.transition()
						.duration(1250)
						.style("fill", "#"+333);
					}
					
				}

}
function offcilic(tex){
	for(let i=0; i<dane.length; i++){
		if(tex!=dane[i].gatunek){
			mGatunku(dane[i]);
			d3.selectAll("#"+dane[i].gatunek +i)
				.style('fill',"#"+333)
				.transition()
				.duration(1250)
				.style("fill", "#"+mnoznikGatunkow*kolorBazowy);
				
		}
	}
}
function film(i,styl,tex){
		if(i%4==0)
			mnoznikDoGatonkow++;
		i = i - mnoznikDoGatonkow*4 + 4;
	d3.select("svg")//filmy
			.append("circle")
			.attr("id","gatunek")
			.attr("r", domyslnaWielkoscKulek+5)//rozmiar
			.attr("cx", mnoznikDoGatonkow*99)
			.attr("cy", 650+i*25)
			.style("fill",styl*kolorBazowy)
			.on('mouseover',function() {
				cilic(tex);
				})//rozjasnienie wybranych
			.on('mouseout',function () {
				offcilic(tex);
				})//od nowa wywolanie calej funkcji test przez co ryzuje sie wszystko	
	d3.select("svg")//liczy ocen
			.append("text")
			.attr("x", mnoznikDoGatonkow*99+15)
			.attr("y", 650+i*25)
			.attr("fill", "grey")
			.attr("font-size", 15)
			.text(tex)
.on('mouseover',function() {
				cilic(tex);
				})//rozjasnienie wybranych
			.on('mouseout',function () {
				offcilic(tex);
				})			
	}
function etykieta(tab){
			console.log(tab);
			if(trybFilmow==1){
			var x=50 + (tab.rok-1915)*(1400/104);
			var y = 600 - tab.ocena*(55);
		}
		else if(trybFilmow==2){
			x=50+tab.boxoffice*xWidokDrugi;
			y=600-tab.budzet/ywidokDrugi;
		}			
			if((x+175)>1500)
				x-=170;
			
			d3.select("svg")
			.append("rect")
			.attr("id","etykieta")
			.attr("height", 110)
			.attr("width", 180)
			.attr("x", x+5)
			.attr("y", y-5)
			.style("fill",444);
			
			d3.select("svg")
			.append("rect")
			.attr("id","etykieta")
			.attr("height", 100)
			.attr("width", 170)
			.attr("x", x+10)
			.attr("y", y)
			.style("fill",111);
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
				.attr("font-family", "Comic Sans MS")
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
		.style("fill",222)
		 .on("click", mouseClick);
		 function mouseClick() {
			 if(f == 2){
				usunOznaczenia();
				oznaczenia("mln","mln",2);
				dwa();
			 }
			else if(f = 3){
				usunOznaczenia();
				oznaczenia("rok","ocena",1);
				trzy();
			}
		}
		d3.select("svg")//text
			.append("text")
			.attr("x", 675)
			.attr("font-family", "Comic Sans MS")
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
				dwa();
			 }
			else if(f = 3){
				usunOznaczenia();
				oznaczenia("rok","ocena",1);
				trzy();
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
		d3.select("svg")//linia X
			.append("line")
			.attr("x1", 50)
			.attr("y1", 600-i*55)
			.attr("x2", 1450)
			.attr("y2", 600-i*55)
			.style("stroke", "white")
		.style("stroke-width", "0.25px");
	}	
}
function oznaczenia(texX,texY,tryb){//lata + i, oceny + i, rok, ocena
	var pomocniczaF = 0; 			
	for(let i=0; i<105; i++){
		if(tryb==2){
			pomocniczaF = i*27;
		}			
		else 
			pomocniczaF = 1915+i;
		if(i%2==0){
			d3.select("svg")//lata na osi
				.append("text")
				.attr("id", "lata" + i)
				.attr("x", 40)
				.attr("y", 620)
				.attr("fill", "darkgreen")
				.attr("font-size", 10)
				.text(pomocniczaF);//.text(i+1915);
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
		}		
		else {
			pomocniczaF = i;
		}
		d3.select("svg")//liczy ocen
			.append("text")
			.attr("id", "ocena" + i)
			.attr("x", 30)
			.attr("y", 600)
			.attr("fill", "darkgreen")
			.attr("font-size", 15)
			.text(pomocniczaF);//.text(i);		
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
function test(){
	var gatunek = parseInt(gatunek,2);
	gatunki();	
		d3.selectAll("#przycisk").remove();
			przycisk("Drugi widok",2)

	oznaczenia("rok","ocena",1915,0);
	linie();
	filmy();
}
function dwa(){
	trybFilmow=2;
		for(let i=0; i<dane.length; i++){
			d3.selectAll("#" + dane[i].gatunek+i)
				.transition()
				.duration(2000)
				.attr("cx", 50+dane[i].boxoffice*xWidokDrugi)
				.attr("cy", 600-dane[i].budzet/ywidokDrugi);
	}
	przycisk("Pierwszy widok",3);
}
function trzy(){
	trybFilmow=1;
	for(let i=0; i<dane.length; i++){
			d3.selectAll("#" + dane[i].gatunek+i)
				.transition()
				.duration(1000)
				.attr("cx", 50 + (dane[i].rok-1915)*(1400/104))
				.attr("cy", 600 - dane[i].ocena*(55));
	}
	przycisk("Drugi widok",2);
	}
});
}
