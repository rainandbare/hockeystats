import { FETCH_CERTIFICATES } from './action_types';
import * as firebase from 'firebase';

import slug from '../functions/slug.js';

const storage = firebase.storage();
const storageRef = storage.ref();


const database = firebase.database();

const certificateRef = database.ref('/certificates');
const playersRef = database.ref('/playersList');
 
let firstTime = 0;

export function createCertificateObject(){
	if (firstTime === 0) {
		//console.log(firstTime)
	//TODO Make sure that the reducers are getting the right information 
	//and that the information in the database is recorded properly (ie birth vs death certs)
	//and make sure that we are only calling this function once upon loading the whole app for the first time and once whenever we add new certs

		playersRef.on('value', function(snapshot) {
		 	//const playersNames = getPlayersNamesfromSnapshot(snapshot.val());
			//console.log(playersNames)		
	//const playersNames = [ "acombDoug", "adamRuss", "aitkenBrad", "andersonJohn","andreychukDave","appsSyl","armstrongDerek","arnielScott","backmanMike","baileyReid","bakerJamie","barnesBlair","barrDave","barrettFred","barrettJohn","berehowskyDrake","billingtonCraig","bloomMike","boughnerBob","boutettePat","boyleDan","brewerCarl","brownAndy","brownJeff","brownRob","burrowsDave","byersMike","cafferyTerry","campbellColin","campbellScott","capriceFrank","carletonWayne","carlinBrian","cherryDick","cherryDon","conacherBrian","crosbySidney","doreyJim","driverBruce","drydenDave","drydenKen","ecclestoneTim","edwardsDon","espositoPhil","flatleyPat","footeAdam","harrisTed","hodsonKevin","howellHarry","hrechkosyDave","irvineTed","keaneMike","kehoeRick","kerrTim","kilreaBrian","laskowskiGary","leiterBob","lindrosBrett","lindrosEric","luceDon","lynchJack","mackaseyBlair","macneilBernie","mactavishCraig","mairAdam","mazurJay","mccarthyKevin","mcdonoughAl","mckechnieWalt","mckennyJim","mcnabPeter", "mcsheffreyBryan", "mcsorleyMarty", "meehanGerry","meekerMike","middletonRick","millsCraig","mooreBarrie","mullerKirk","mulveyGrant","napierMark","odonnellSean","oliverMurray","pappinJim","parkBrad","patersonMark","plumbRob","plumbRon","potvinJean","potvinMarc","quinnPat","richardMaurice","richardsonLuke","riversShawn","riversWayne","romaniukRuss","rootBill","saundersDavid", "scrutonHoward", "semenkoDave", "shuchukGary", "shuttSteve", "stewartBlair", "stoneSteve", "sydorDarryl", "therienChris", "tocchetRick" ];
	
	//const playersNames = ["abelSid", "abelTaffy", "adamsJack", "adamsStew", "albrightClint", "alexandreArt", "allenGeorge", "allumBill", "amadioDave", "andersonDale", "andersonDoug", "andersonLorne", "andersonRed", "arbourAl", "arbourAmos", "arbourJack", "armstrongBob", "ashbeeBarry", "ashbyDon", "astasenkoKaspars", "atkinsonSteve", "attwellRon", "aubuchonOssie", "augeLes", "aurieLarry", "ayresVern", "backorPete", "baileyBob", "baileyGarnetAce", "baileyIrvineAce", "baldwinDoug", "balfourMurray", "balonDave", "barbeAndy", "barilkoBill", "barnesBlair", "barryEd", "barryMarty", "bartonCliff", "bastienBaz", "bathgateAndy", "bathgateFrank", "battersJeff", "bauerBobby", "beattieRed", "behlingDick", "beislerFrank", "belakWade", "belangerRoger", "bellBilly", "bellefeuillePete", "bellemerAndy", "bellHuddy", "bellJoe", "bendLin", "benedictClint", "bensonBill", "bensonBobby", "bentleyDoug", "bentleyMax", "bergmanGary", "beveridgeBill", "bibeaultPaul", "blackSteve", "bladeHank", "blaineGary", "blairAndy", "blairChuck", "blakeBob", "blakeToe", "blightRick", "blincoRuss", "bodnarGus", "boehmRon", "boltonHugh", "boogaardDerek", "bostromHelge", "bouchardButch", "bouchardDick", "boucherBilly", "boucherBobby", "boucherClarence", "boucherFrank", "boucherGeorge", "bourcierConrad", "bourdginonFred", "bourdonLuc", "bourgeaultLeo", "bouvretteLionel", "bownassJack", "bradleyBart","breitenbachKen", "brennanTom", "brettoJoe", "brewerCarl", "bridenArchie", "briereMichel", "brimsekFrank", "brinkMilt", "brissonGerry", "broadbentPunch", "brodaTurk", "brodenConnie", "broderickKen", "brooksArt", "brophyFrank", "brownAdam", "brownConnie", "browneCecil", "brownGerry", "brownHal", "brownschidleJeff", "bruceGordie","bruneteauEd", "bruneteauMud", "brydgeBill", "brydsonGlenn", "brydsonGord", "buchananAl", "buchananBucky", "buhrDoug", "bukovichTony", "bullerHy", "burchBilly", "burchellFred", "burmisterRoy", "burtonCummy", "bushEddie", "buswellWalt", "byersJerry", "cafferyJack", "calladineNorm", "callighenPatsy", "cameronBilly", "cameronHarry", "cameronScotty", "campbellEarl", "carbolLeo", "caronAlain", "carpenterEd", "carrRed", "carsonBill", "carsonFrank", "carsonGerry", "cavanaghTom", "chabotLorne", "chamberlainMurph", "chapmanArt", "chevrefilsReal", "chiassonSteve", "chisholmLex", "chouinardGene", "churchJack", "cieslaHank", "clapperDit", "clarkeNobby", "cleghornOdie", "clehgornSprague", "cluneWally", "collingsNorm", "colmanMichael", "colvilleMac", "colvilleNeil", "conacherRoy", "connellAlec", "connorHarry", "connorsBobby", "conveyEddie", "cookBill", "cookBun", "cooperCarson", "cooperJoe", "coppBobby", "corbettMike", "corcoranNorm", "cormierRoger", "corriveauAndre", "cotchCharlie", "cottonBaldy", "coutureGerry", "coutureRosie", "cowleyBill", "crawfordRusty", "creightonJimmy", "croghanMoe", "crossettStan", "crozierRoger", "cudeWilf", "cunninghamLes", "cupoloBill", "currieHugh", "curryFloyd", "cyrClaude", "cyrPaul", "dameBunny", "darraghHarry", "darraghJack", "davidsonGord", "davisBob", "davisLorne", "davisonMurray", "dawesBobby", "dayHap", "deaconDon", "defeliceNorm", "delisleJonathan", "demarcoAb", "demersTony", "demitraPavol", "deniordGerry", "dennenyCorb", "dennenyCy", "desiletsJoffre", "dewarTom", "dheereMarcel", "dickHarry", "dickieBill", "dillaboughBob", "dillBob", "dineenBill", "dinsmoreDinny", "doakGary", "doranJohnRed", "doratyKen", "dorohoyEd", "douglasKent", "douglasLes", "drillonGord", "drouinPolly", "drummondJim", "dubeGilles", "duchesneGaetan", "dufourMarc", "duguidLorne", "dukowskiDuke", "dumartWoody", "duncanArt", "dunlapFrank", "dunnRichie", "durbanoSteve", "durnanBill", "duttonRed", "dyckEd", "dyeBabe", "eddollsFrank", "edestrandDarryl", "edmundsonGarry", "edwardsRoy", "elliottFred", "emmsHap", "evansStew", "fillionBob", "finkbeinerLloyd", "finniganFrank", "fisherDunc", "flemingReggie", "flettBill", "fogartyBrian", "forbesJake", "fowlerJimmy", "foystonFrank", "fraserCharles", "frewIrv", "frostHarry", "frydayBob", "gainorDutch", "gallingerDon", "gambleBruce", "gardinerCharlie", "gardinerHerb", "gardnerCal", "garlandScott", "garrettRed", "gassoffBob", "gaudreaultLeo", "geeGeorge", "gelineauJack", "geoffrionBernie", "gerardEddie", "getliffeRay", "gillAndre", "girardBob", "gloverFred", "godinSammy", "goeganPete", "goldhamBob", "goldsworthyBill", "goldsworthyLeroy", "goodfellowEbbie", "goodmanPaul", "gormanEd", "goveDavid", "gracieBob", "grahamLeth", "grahamTeddy", "grantBenny", "greenRed", "greenShorty", "grosvenorLen", "guidolinAldo", "guidolinBep", "haggartyJim", "hainsworthGeorge", "haldersonSlim", "hallBob", "hallidayMilt", "hamillRed", "hamiltonJack", "hamiltonReg", "hannaJohn", "hanniganGord", "hansenOscar", "harbarukNick", "harmonGlen", "harmsJohn", "harnottWalter", "harringtonHago", "harrisBilly", "heffernanGerry", "heindlBill", "hellerOtt", "helmanHarry", "hendersonMurray", "henryCamille", "henryGord", "henrySugarJim", "herbertSailor", "hergertFred", "hergesheimerPhil", "hergesheimerWally", "heronRed", "hextallBryan", "hitchmanLionel", "hodgeCharlie", "hrymnakSteve", "hugginsAl", "hughesAl", "huttonBill"];		 	
	//const playersNamesD1 = [ "draperBruce", "allenKeith", "flamanFern", "gagneArt", "gagnonJohnny", "hagmanMatti", "andersonJim", "appsSyl", "conacherCharlie", "armstrongMurray", "corbeauBert", "atamasWalt", "carseBob", "costelloLes", "beadleSandy", "crutchfieldNels", "davidsonBob", "dyckHenry", "evansChris", "crawfordJack", "bilodeauGilles", "ezinickiBill", "biondaJack", "bolandMike", "fisherJoe", "davieBob", "brayshawRuss", "dolsonDolly", "burrShawn", "fredricksonFrank", "byersMike", "dussaultNorm", "gadsbyBill", "galbraithPercy", "giesebrechtGus", "gronsdahlLloyd", "gardnerGeorge", "heximerObs", "harrisDuke", "hallJoe", "horeckPete"]
	//const playersNamesD2 = ["allenKeith" ,"andersonJim" ,"appsSyl" ,"armstrongMurray" ,"atanasWalt" ,"beadleSandy" ,"bilodeauGilles" ,"biondaJack" ,"bolandMike" ,"brayshawRuss" ,"burrShawn" ,"byersMike" ,"carseBob" ,"conacherCharlie" ,"corbeauBert" ,"costelloLes" ,"crawfordJack" ,"crutchfieldNels" ,"davidsonBob" ,"davieBob" ,"dolsonDolly" ,"draperBruce" ,"dussaultNorm" ,"dyckHenry" ,"evansChris" ,"ezinickiBill" ,"fisherJoe" ,"flamanFern" ,"fredricksonFrank" ,"gadsbyBill" ,"gagnonJohnny" ,"galbraithPercy" ,"gardnerGeorge" ,"giesebrechtGus" ,"gronsdahlLloyd" ,"hagmanMatti" ,"hallJoe" ,"harrisDuke" ,"heximerObs" ,"horeckPete"]
	// const playersNamesD3 = ["flamanFern", "ezinickiBill", "atanasWalt"]
	//const playersNames = ["grayAlex", "grigorGeorge", "grossLloyd", "harrisSmokey", "herchenratterArt", "hillMel", "hoekstraCec", "isakssonUlf", "jacksonWalter", "javanainenArto", "juzdaBill", "almasRed", "arundelJohn", "bettioSam", "blakeMickey", "boileauRene", "bollBuzz", "boydYank", "brownGeorge", "bruceMorley", "cainHerb", "clancyKing", "conacherLionel", "connellyBert", "cookBob", "damoreNick", "dewsburyAl", "drouillardClare", "dugganJack", "dupreYanick", "dvorakMiroslav", "ehmanGerry", "finniganEd", "folkBill", "fraserGord", "gaudreaultArmand", "gauthierArt", "kirkpatrickBob", "kotanenDick", "kullmanEddie", "labovitchMax", "lafleurRene", "lauderMartin", "levequeGuy", "lundeLen", "mackeyReg", "macphersonBud", "makiChico", "mannJack", "markerGus", "marksJack", "marotteGilles", "martinClare", "martinRon", "masonCharlie", "mastertonBill", "mathersFrank", "matteJoe", "mazurEddie", "mcandrewHazen", "mcauleyKen", "mccabeStan", "mccaffreyBert", "mccaigDoug", "mccallumDunc", "mccalmonEddie", "mccartneyWalt", "mccoolFrank", "mccormackJohn", "mccrearyKeith", "mccurryDuke", "mcdonaldBucko", "mcdonaldJack", "mcfaddenJim", "mcfarlaneGord", "mcgibbonIrv", "mcgillJack", "mcguireMickey", "mcintyreJack", "mcleanJack", "mclellanJohn", "mclenahanRollie", "mcmahonMike", "mcmahonMikeJr", "mcnabneySid", "mcnamaraHoward", "mcreavyPat", "meekingHarry", "melnykGerry", "meronekBill", "merrillHorace", "metzNick", "mickeyLarry", "mickoskiNick", "milksHib", "millerBill", "millerEarl", "mitchellHerb", "mitchellMike", "moeBilly", "mohnsDoug", "molyneauxLarry", "mondouArmand", "mooreDickie", "morenzHowie", "morinPete", "morinStephane", "morrisMoe","mortsonGus", "mosienkoBill", "motterAlex", "mummeryHarry", "munroDunc", "munroGerry", "murdochMurray", "murrayLeo", "mylesVic", "mylnikovSergei", "newmanJohn", "nicholsonEd", "nicholsonHickey", "nobleReg", "northcottBaldy", "nyropBill", "obrienEllard", "oconnorBuddy", "oliverHarry", "olmsteadBert", "oneillWindy", "orlandoJimmy", "ouelletteTed", "owenGeorge", "pailleMarcel", "parkesErnie", "parsonsGeorge", "pasekDusan", "patrickLester", "patrickLynn", "patrickMuzz", "pattersonPaddy", "paulButch", "pettingerEric", "pitreDidier", "plagerBarclay", "plagerBill", "planteJacques", "plaxtonHugh", "podolskyNels", "poileBud", "poirierGordie", "portlandJack", "poulinDan", "prattBabe", "prenticeEric", "primeauJoe", "prodgersGoldie", "provostClaude", "pudasAl", "purpurFido", "pusieJean", "quiltyJohn", "radleyYip", "raglanRags", "randallKen", "raymondPaul", "raynerCharlie", "reardonTerry", "redahlGord", "reganLarry", "reidReg", "reigleEd", "reiseLeoSr", "rheaumeHerb", "richardJacques", "richardMaurice", "ringBob", "ritchieDave", "roachJohnRoss", "robertClaude", "robertsonEarl", "robinsonEarl", "rocheEarl", "rockburnHarvey", "roddenEddie", "rollinsAl", "romboughDoug", "ronanSkene", "rossArt", "rothschildSam", "roulstonRolly", "roweRon", "rungePaul", "russellChurch", "rutledgeWayne", "sandsCharlie", "savageTony", "sawchukTerry", "schaeferJoe", "schmidtJackie", "schmidtMilt", "schmidtOtto", "schrinerSweeney", "scottLaurie", "seibertEarl", "semenkoDave", "shannonGerry", "shayNorm", "sheroFred", "shieldsAl", "shillBill", "shillJack", "shmyrPaul", "shoreEddie", "shoreHamby", "siebertBabe", "simonCully", "simpsonBulletJoe", "simpsonCliff", "singbushAlex", "sinisaloIlkka", "sjobergLars-Erik", "smartAlex", "smithAl", "smithAlex", "smithArt", "smithBarry", "smithBrian", "smithDes", "smithDon", "smithGlen", "smithHooley", "smithRodger", "smithTommy", "smrkeStan", "smylieRod", "snyderDan", "somersArt", "speerBill", "touheyBill", "trainorWes", "tremblayGilles", "speyerChris", "spoonerRed", "springJesse", "st-laurentDollard", "stackhouseTed", "stahanButch", "stanleyBarney", "starrHarold", "starrWilf", "stewartBob", "stewartGaye", "stewartJack", "stewartNels", "stewartRon", "strainNeil", "strobelArt", "stuartHerb", "sullivanBarry", "summerhillBill", "suomiAl", "sutherlandBill", "taylorBilly", "taylorBob", "taylorRalph", "tenoHarvey", "tertyshnyDmitri", "thompsonCliff", "thompsonPaul", "thompsonTiny", "thomsBill", "thomsonRhys", "thorsteinsonJoe", "timgrenRay", "tremblayNils", "trottierDave", "tudinConnie", "vailSparky", "vaskoMoose", "vezinaGeorges", "vyazmikinIgor", "waltonBobby", "waresEddie", "warwickGrant", "wasnieNick", "watsonPhil", "websterChick", "websterDon", "weilandCooney", "wentworthCy", "wharramKen", "wheldonDon", "whitelawBob", "whiteMoe", "wickenheiserDoug", "widingJuha", "wiebeArt", "wilderArchie", "wilkinsonJohn", "williamsTommy", "willsonDon", "wilsonBert", "wilsonLefty", "winklerHal", "wisemanEddie", "wortersRoy", "woytowichBob", "wycherleyRalph", "youngDoug", "youngHowie"];
	const playersNamesD1 = ['tremblayJ-C'];
	//[ "martinSeth", "gottseligJohnny", "beliveauJean", "karpovValeri", "gravelleLeo", "mcavoyGeorge", "mcneilGerry", "mongeauMichel", "morrisonGeorge", "montadorSteve", "massecarGeorge", "nighborFrank", "quackenbushBill", "probertBob", "palangioPete", "oflahertyPeanuts", "mosdellKen", "quinnPat", "reayBilly", "raleighDon", "robertsJimmy", "saundersTed", "skaareBjorn", "shibickyAlex", "skinnerAlf", "sloanTod", "slyDarryl", "smithSid", "smithClint", "spencerBrian", "toppazziniJerry", "tremblayJ-C", "tsygurovDenis", "turnerBob", "walshFlat", "watsonHarry", "wilsonJerry", "youngBJ"];
	//const playersNamesD2 = ["beliveauJean","gottseligJohnny","gravelleLeo","karpovValeri", "martinSeth","massecarGeorge","mcavoyGeorge","mcneilGerry","mongeauMichel","montadorSteve","morrisonGeorge","mosdellKen","nighborFrank","oflahertyPeanuts","palangioPete","probertBob","quackenbushBill","quinnPat","raleighDon","reayBilly","robertsJimmy","saundersTed", "shibickyAlex","skaareBjorn","slyDarryl","smithClint","smithSid","spencerBrian","toppazziniJerry","tremblayJ-C","tsygurovDenis","turnerBob","walshFlat","watsonHarry","wilsonJerry","youngBJ"];
	 //const playersNamesD3 = ["karpovValeri", "saundersTed"];



 	playersNamesD1.map(name => recordCertificates(name));

// function getPlayersNamesfromSnapshot(snapshotVal){
		 	// 	// console.log(snapshotVal);
		 	// 	const playersListKeys = Object.keys(snapshotVal);
		 	// 	const playersNames = [];
		 	// 	playersListKeys.map((key) => {
		 	// 		const playerName = snapshotVal[key].name;
		 	// 		playersNames.push(playerName);
		 	// 		return true;
		 	// 	});
		 	// 	return playersNames;
		 	// }
		 	function recordCertificates(name){
		 		const nameFormatted = slug(name);
		 		console.log(nameFormatted);
				// storageRef.child("birth/" + nameFormatted + "-B.jpg")
				// 	.getDownloadURL()
				// 	.then(onResolveBirth, onReject);
				//console.log(storageRef.child("death/wycherleyRalph-D.jpg").getDownloadURL());
				storageRef.child("death/tremblayJ-C-D2.jpg")
					.getDownloadURL()
					.then(onResolveDeath, onReject);
				
				// function onResolveBirth(imageUrl) {
				//     writeCertificateData(nameFormatted, "birth", imageUrl)
				// }

				function onResolveDeath(imageUrl) {
					console.log('made it to here');
				    writeCertificateData(nameFormatted, "death", imageUrl)
				}	

				function onReject(error) {
				    //console.log(error.code);
				}
		 	}
			function writeCertificateData(name, type, imageUrl) {
				  database.ref('certificates/' + type + "/" + name + '-1').set({
				    url : imageUrl
				  });
			}
		// firstTime++;
		});
	}

};

	
export function fetchCertificates() {
	return dispatch => {
		certificateRef.on('value', snapshot => {
			dispatch({
				type: FETCH_CERTIFICATES,
				payload: snapshot.val()
			})
		})
	}

 }

const typeCodes = {
	'B' : 'birth',
	'D' : 'death'
}

export function addCertificate(file, type, nameFormatted) {

	const filepath = typeCodes[type] + '/' + nameFormatted + '-' + type + '.jpg';
	const certStorageRef = storage.ref(filepath);
	return dispatch => { certStorageRef.put(file).then(function(snapshot){
  		if (snapshot.f === "success"){

  			const imageUrl = snapshot.a.downloadURLs[0]
  			database.ref('certificates/' + typeCodes[type] + '/' + nameFormatted).set({ url : imageUrl });
  		}
	});
	}
}

export function removeCertificate(playerSlug, type){
		const typeCodesReversed = {
			'birth':'B' ,
			'death':'D' 
		}
		// Create a reference to the file to delete
		const url = type + '/' + playerSlug + '-' + typeCodesReversed[type] + '.jpg';
		console.log(url)
		const deleteRef = storageRef.child(type + '/' + playerSlug + '-' + typeCodesReversed[type] + '.jpg');

		// Delete the file
		return dispatch => deleteRef.delete().then(function() {
			console.log('remove from database')
			database.ref('certificates/' + type ).child(playerSlug).remove();
		  // File deleted successfully
		}).catch(function(error) {
		  // Uh-oh, an error occurred!
		  console.log(error)
		});
}

