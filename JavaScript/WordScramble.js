// Full Unscramble Game JavaScript Code with 100 Words per Level

const WordsbeingScrambled = {
  3: [
    'ace','act','add','age','aim','air','and','ant','any','ape','arc','arm','art','ash','ask','ate','bad','bag','ban','bar',
    'bat','bay','bed','bee','beg','bet','bid','big','bin','bit','boa','bob','bog','box','boy','bug','bun','bus','but','buy',
    'cab','can','cap','car','cat','cop','cow','cry','cub','cup','cut','dad','dam','day','den','dew','did','dig','dim','dip',
    'dog','dot','dry','due','dug','ear','eat','egg','elf','end','fan','far','fat','fax','fed','fee','fig','fin','fit','fix',
    'fly','fog','for','fox','fun','fur','gap','gas','gel','get','gig','got','gum','gun','gut','guy','gym','had','ham','hat'
  ],
  4: [
    'able','area','army','baby','back','ball','band','bank','base','bath','bear','beat','been','beer','bell','belt','bend','best','bill','bird',
    'blow','blue','boat','body','bomb','bond','bone','book','boom','boot','born','boss','both','bowl','bulk','burn','bush','busy','call','calm',
    'camp','card','care','case','cash','cast','cell','chat','chip','city','club','coal','coat','code','cold','come','cook','cool','cope','copy',
    'core','cost','crew','crop','dark','data','date','dawn','dead','deal','dear','debt','deep','deny','desk','dial','diet','disc','disk','door',
    'dose','down','draw','drop','drug','drum','duck','dust','duty','earn','ease','east','edge','else','even','ever','exit','face','fact','fail'
  ],
  5: [
    'about','above','abuse','actor','admit','adopt','adult','after','again','agent','agree','ahead','alarm','album','alert','alike','alive','allow','alone','along',
    'alter','among','anger','angle','angry','apart','apple','apply','arena','argue','arise','armed','aside','asset','audio','audit','avoid','award','aware','badly',
    'baker','basic','basis','beach','begin','being','below','bench','birth','black','blame','blind','block','blood','board','boost','booth','bound','brain','brand',
    'bread','break','brick','brief','bring','broad','brown','build','buyer','cable','calm','carry','catch','cause','chain','chair','chart','check','chief','child',
    'china','chose','civil','claim','class','clean','clear','click','clock','close'
  ],
  6: [
    'access','across','acting','action','active','actual','advice','advise','affect','afford','afraid','agency','agenda','almost','always','amount','animal','annual','answer','anyone',
    'anyway','appeal','appear','around','arrive','artist','aspect','assess','assign','assist','assume','attack','attend','august','author','backup','barely','battle','beauty','become',
    'before','behalf','behave','behind','belief','belong','benefit','beside','better','beware','beyond','bishop','border','bottle','bottom','bounce','branch','breach','breeze','bright',
    'bring','broken','budget','buffer','burden','butter','button','camera','cancel','cancer','cannot','carbon','career','castle','casual','caught','centre','chance','change','charge',
    'charity','cheese','choose','circle','client','clinic','closed','closer','coffee','column'
  ],
  7: [
    'ability','absence','academy','account','accused','achieve','acquire','address','advance','advice','advisor','against','airline','airport','alcohol','allege','already','amazing','analyst','analyze',
    'ancient','angered','animaly','annoyed','anxious','appears','applied','appoint','approve','arrange','arrival','article','artists','aspecta','attempt','attract','auction','average','awesome','balance',
    'banking','barrier','battery','bearing','beating','because','becomes','believe','beloved','benefit','besides','between','beyond','blanket','blessed','boating','borrowe','bother','breathe','briefly',
    'brother','builder','burried','cabinet','calling','capable','capital','caption','capture','careful','carrier','cartoon','ceiling','certain','chamber','chances','channel','chapter','charity','cheaper'
  ],
  8: [
    'absolute','activity','actually','addition','adequate','advanced','advisory','advocate','airplane','alliance','although','aluminum','analysis','announce','anything','anywhere','apparent','approach','approval','argument',
    'assembly','assigned','athletic','attached','attempts','audience','autumnal','backbone','backdrop','backyard','balanced','bankrupt','barbecue','bathroom','battered','becoming','birthday','blankets','blessing','blocking','boundary',
    'breaking','building','business','calendar','campaign','capacity','capsules','casually','catering','caution','celebrity','cemented','ceremony','champion','changing','channels','charging','checking','chemical','children',
    'chilling','clothing','coaching','collapse','collects','college','combine','comforts','command','commerce','communal','compact','company','compare','compete','complex','compost','concept','concern','concert'
  ],
  9: [
    'absolutely','academicly','accepting','accessory','accidents','accounted','accustomed','admirable','advantage','adventure','advisable','advocates','agreement','airplanes','allegedly','allowance','alongside','alternate','aluminium','ambitions',
    'amplitude','analyzing','anecdotes','announced','anonymous','answering','apologize','appetizer','appraisal','appreciate','approval','arguments','assembling','attention','attitudes','authority','automatic','available','awakening','backwards',
    'bachelor','backpacks','ballerina','baseboard','baseball','basketful','bathrooms','beautiful','bedspread','beginning','benchmark','benefited','biography','blackmail','blackouts','blockhead','blueberry','bookstore','brainwash','breakfast',
    'breathless','briefcase','broadcast','broccoli','brutality','calculator','candidate','carefully','casualties','celebrate','cellphone','certainty','chairlift','chancellor','cheerful','childhood','cholesterol','cigarette','classroom','clearance'
  ]  // I asked chatGPT to give me 100 words. From letters containing 3 letters to 9 letters.
};

let currentLength = 3;
let score = 0;
let correctAnswers = 0;
let lives = 3;
let currentWord = '';
let scrambled = '';

function shuffleWord(word) {
  let arr = word.split('');
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr.join('');
}

function getRandomWord(length) {
  const words = WordsbeingScrambled[length];
  return words[Math.floor(Math.random() * words.length)];
}

function updateUI() {
  document.getElementById('level').innerText = `Level: ${currentLength - 2}`;
  document.getElementById('score').innerText = `Score: ${score}`;
  document.getElementById('lives').innerText = `Lives: ${lives}`;
  document.getElementById('scrambledWord').innerText = scrambled || '';
  document.getElementById('inputWord').value = '';
}

function nextWord() {
  const wordList = WordsbeingScrambled[currentLength];
  if (!wordList || wordList.length === 0) {
    console.error(`No words for length ${currentLength}`);
    return;
  }

  currentWord = getRandomWord(currentLength);
  scrambled = shuffleWord(currentWord);
  let attempts = 0;
  while (scrambled === currentWord && attempts < 10) {
    scrambled = shuffleWord(currentWord);
    attempts++;
  }

  updateUI();
}

function submitGuess() {
  const guess = document.getElementById('inputWord').value.trim().toLowerCase();
  if (!guess || !currentWord) return;

  if (guess === currentWord) {
    score += 100;
    correctAnswers++;

    if (correctAnswers % 3 === 0 && currentLength < 9) {
      currentLength++;
    }

    if (currentLength > 9) {
      document.getElementById('message').innerText = " Congratulations! You beat the game!";
      document.getElementById('scrambledWord').innerText = '';
      return;
    }

    document.getElementById('message').innerText = ' Correct!';
    nextWord();
  } else {
    lives--;
    if (lives <= 0) {
      document.getElementById('message').innerText = ` Game Over! The word was "${currentWord}".`;
      document.getElementById('scrambledWord').innerText = '';
      currentWord = '';
    } else {
      document.getElementById('message').innerText = ` Wrong! Try the next word.`;
      nextWord();
    }
  }

  updateUI();
}

function startGame() {
  currentLength = 3;
  score = 0;
  correctAnswers = 0;
  lives = 3;
  document.getElementById('message').innerText = '';
  nextWord();
}

window.onload = startGame;
