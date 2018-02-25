function isInt(word) {
	return Number.isInteger(parseInt(word))
}

function isWordIncluded(word) {
	const firstLetter = word[0].toLowerCase();
	return data[firstLetter] && data[firstLetter].includes(word.toLowerCase().trim())
}

function parseText(text) {
	var innerText = text.split(/\s/);
	var result = '';
	innerText.forEach(function(word) {		
		if(isInt(word) || word.length < 2 || isWordIncluded(word) ) {
			result += word + ' ';
		} else {
			result += '<span style="background: #ffff99; cursor:pointer;" title="Right click to enable browser\'s spellcheck to show suggestions">' + word + '</span>' + ' ';	
		}
	});	
	return result
}

function createEditableParagraph(value) {
	var p = document.createElement('p');
		p.innerHTML = parseText(value)
	    p.setAttribute('contenteditable', true);
	    p.setAttribute('spellcheck', true);
	    p.style.borderBottom = '1px solid black';
	    p.style.margin = '15px 0';
	    p.style.outline = 'none';
	    p.style.paddingBottom = '12px';
	return p;
}

function clearInnerText(text) {
	return text.replace(/(\s\s+)/g, ' ');
}

function include(path) {
	var js = document.createElement("script");
	js.type = "text/javascript";
	js.src = path;
	document.body.appendChild(js);

	js.onload = function() {
		var inputs = document.getElementsByClassName('spellcheck');
		for(var input of inputs) {
			input.type = 'hidden'
			var p = createEditableParagraph(input.value);
			input.parentNode.insertBefore(p, input);

			p.onblur = function() {
				var innerText = clearInnerText(this.innerText)
				input.value = innerText;				
				this.innerHTML = parseText(innerText);
				var errors = document.getElementsByClassName('error');
			}
		}
	}
}



window.onload = function() {
	include('data.json');
}
