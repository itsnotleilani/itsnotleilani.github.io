document.addEventListener('DOMContentLoaded', function() {

	// color palette
	const green = 'rgb(129, 182, 34)';
	const brown = 'rgb(164,117,81)';
	const gray = 'rgb(204,204,204)';
	const blue = 'rgb(0,0,255)';

	function initializeScore(value, elementId, prefix) {
        updateScore();

        function updateScore() {
            document.getElementById(elementId).textContent = value;
        }

        window[prefix + 'Cut'] = function(amt) {
            value += amt;
            updateScore();
        };

        window[prefix + 'SubCut'] = function(amt) {
            value -= amt;
            updateScore();
        };
    }
	
	initializeScore(7, 'value', 'first');
    initializeScore(10, 'value2', 'second');
	initializeScore(5, 'value3', 'third');

	let currentWindow = 'first';
	function switchWindow(windowName) {
		currentWindow = windowName;
	}

	const guessInput = document.getElementById('guessInput');
    const enterButton = document.getElementById('enterButton');
    const resultDiv = document.getElementById('result');

	enterButton.addEventListener('click', function() {
        // Get the value entered in the input field
        const guess = guessInput.value;

        // Check if the guess matches the value
		if (guess === (currentWindow === 'first' ? value : currentWindow === 'second' ? value2 : value3).textContent.toString()) {
            resultDiv.textContent = 'Congratulations! You guessed correctly.';
        } else {
            resultDiv.textContent = 'Sorry, your guess is incorrect. Please try again.';
        }
    });

    guessInput.addEventListener('keypress', function(event) {
        // Check if the key pressed is Enter (key code 13)
        if (event.key === 'Enter') {
            // Prevent the default behavior (form submission)
            event.preventDefault();
            // Trigger the click event of the enter button
            enterButton.click();
        }
    });

	document.getElementById('graph1Btn').addEventListener('click', () => switchGraph('cy1', 'first'));
    document.getElementById('graph2Btn').addEventListener('click', () => switchGraph('cy2', 'second'));
    document.getElementById('graph3Btn').addEventListener('click', () => switchGraph('cy3', 'third'));
	
	const switchGraph = (graphId, window) => {
        const graphs = document.getElementsByClassName('graph');
        for (let i = 0; i < graphs.length; i++) {
            graphs[i].style.display = 'none';
        }
        document.getElementById(graphId).style.display = 'block';
		
		switchWindow(window);
		resultDiv.textContent = "";
    };


	document.getElementById('showGuide').addEventListener('click', () => showDropdown());

	const showDropdown = () => {
		if (document.getElementById("dropdown-content").style.display === 'none') {
			document.getElementById("dropdown-content").style.display = 'block';
		} else {
			document.getElementById("dropdown-content").style.display = 'none';
		}
	}

	var cy1 = cytoscape({
	  container: document.getElementById('cy1'), 
	  elements: [ 
		{ data: { id: 's-1', label: 's', clicked: false } }, 
		{ data: { id: 'a-1', label: 'a'} }, 
		{ data: { id: 'b-1', label: 'b' } }, 
		{ data: { id: 'c-1', label: 'c' } }, 
		{ data: { id: 'd-1', label: 'd' } }, 
		{ data: { id: 'e-1', label: 'e' } }, 
		{ data: { id: 'f-1', label: 'f' } }, 
		{ data: { id: 'g-1', label: 'g' } }, 
		{ data: { id: 't-1', label: 't' } }, 
		{ data: { id: 'sa-1', label: 3, source: 's-1', target: 'a-1' } }, // Edge connecting s to a
		{ data: { id: 'ab-1', label: 2,  source: 'a-1', target: 'b-1' } }, // Edge connecting a to b
		{ data: { id: 'sc-1', label: 1,  source: 's-1', target: 'c-1' } }, // Edge connecting s to c
		{ data: { id: 'sd-1', label: 3,  source: 's-1', target: 'd-1' } }, // Edge connecting s to d
		{ data: { id: 'de-1', label: 5,  source: 'd-1', target: 'e-1' } }, // Edge connecting d to e
		{ data: { id: 'df-1', label: 2,  source: 'd-1', target: 'f-1' } }, // Edge connecting d to f
		{ data: { id: 'et-1', label: 3,  source: 'e-1', target: 't-1' } }, // Edge connecting e to t
		{ data: { id: 'be-1', label: 4,  source: 'b-1', target: 'e-1' } }, // Edge connecting b to e
		{ data: { id: 'fc-1', label: 5,  source: 'f-1', target: 'c-1' } }, // Edge connecting f to c
		{ data: { id: 'eg-1', label: 2,  source: 'e-1', target: 'g-1' } } // Edge connecting e to g

	  ],
	  style: [
		{
		  selector: 'node',
		  style: {
			'background-color': green, // Node color
			'label': 'data(label)', // Display node ID as label
			'text-halign': 'center', // Center the label horizontally
        	'text-valign': 'center', // Center the label vertically
			'width': '50px',
			'height': '50px'
		  }
		},
		{
		  selector: 'edge',
		  style: {
			'width': 2, // Edge width
			'line-color': gray, // Edge color
			'curve-style': 'bezier', // Curve style
			'target-arrow-shape': 'triangle', // Arrow shape at the end of the edge
			'label': 'data(label)', // Display node ID as label
		  }
		}
	  ],
	  layout: {
		name: 'grid',
		padding: 10,
		rows: 3,
		cols: 3
	  }
	});

	var cy2 = cytoscape({
		container: document.getElementById('cy2'), 
		elements: [ 
			{ data: { id: 's-2', label: 's' } }, 
			{ data: { id: 'a-2', label: 'a'} }, 
			{ data: { id: 'b-2', label: 'b' } }, 
			{ data: { id: 'c-2', label: 'c' } }, 
			{ data: { id: 'd-2', label: 'd' } }, 
			{ data: { id: 'e-2', label: 'e' } }, 
			{ data: { id: 'f-2', label: 'f' } }, 
			{ data: { id: 'g-2', label: 'g' } }, 
			{ data: { id: 't-2', label: 't' } }, 
			{ data: { id: 'sa-2', label: 7,  source: 's-2', target: 'a-2' } }, // Edge connecting s to a
			{ data: { id: 'ad-2', label: 6,  source: 'a-2', target: 'd-2' } }, // Edge connecting a to d
			{ data: { id: 'sc-2', label: 3,  source: 's-2', target: 'c-2' } }, // Edge connecting s to c
			{ data: { id: 'cd-2', label: 2,  source: 'c-2', target: 'd-2' } }, // Edge connecting c to d
			{ data: { id: 'de-2', label: 4,  source: 'd-2', target: 'e-2' } }, // Edge connecting d to e
			{ data: { id: 'ea-2', label: 6,  source: 'e-2', target: 'a-2' } }, // Edge connecting e to a
			{ data: { id: 'df-2', label: 7,  source: 'd-2', target: 'f-2' } }, // Edge connecting d to f
			{ data: { id: 'et-2', label: 9,  source: 'e-2', target: 't-2' } }, // Edge connecting e to t
			{ data: { id: 'be-2', label: 1,  source: 'b-2', target: 'e-2' } }, // Edge connecting b to e
			{ data: { id: 'fc-2', label: 1,  source: 'f-2', target: 'c-2' } }, // Edge connecting f to c
	
		  ],
		style: [
		{
			selector: 'node',
			style: {
			'background-color': green, // Node color
			'label': 'data(label)', // Display node ID as label
			'text-halign': 'center', // Center the label horizontally
			'text-valign': 'center', // Center the label vertically
			'width': '50px',
			'height': '50px'
			}
		},
		{
			selector: 'edge',
			style: {
			'width': 2, // Edge width
			'line-color': gray, // Edge color
			'curve-style': 'bezier', // Curve style
			'target-arrow-shape': 'triangle', // Arrow shape at the end of the edge
			'label': 'data(label)', // Display node ID as label
			}
		}
		],
		layout: {
		name: 'grid',
		padding: 10,
		rows: 3,
		cols: 3
		}
	});

	var cy3 = cytoscape({
		container: document.getElementById('cy3'), 
		elements: [ 
			{ data: { id: 's-3', label: 's' } }, 
			{ data: { id: 'a-3', label: 'a'} }, 
			{ data: { id: 'b-3', label: 'b' } }, 
			{ data: { id: 'c-3', label: 'c' } }, 
			{ data: { id: 'd-3', label: 'd' } }, 
			{ data: { id: 'e-3', label: 'e' } }, 
			{ data: { id: 'f-3', label: 'f' } }, 
			{ data: { id: 'g-3', label: 'g' } }, 
			{ data: { id: 't-3', label: 't' } }, 
			{ data: { id: 'sa-3', label: 2,  source: 's-3', target: 'a-3' } }, // Edge connecting s to a
			{ data: { id: 'ad-3', label: 4,  source: 'a-3', target: 'd-3' } }, // Edge connecting a to d
			{ data: { id: 'sc-3', label: 3,  source: 's-3', target: 'c-3' } }, // Edge connecting s to c
			{ data: { id: 'ac-3', label: 1,  source: 'a-3', target: 'c-3' } }, // Edge connecting c to d
			{ data: { id: 'dg-3', label: 4,  source: 'd-3', target: 'g-3' } }, // Edge connecting d to g
			{ data: { id: 'ea-3', label: 5,  source: 'e-3', target: 'a-3' } }, // Edge connecting e to a
			{ data: { id: 'dt-3', label: 7,  source: 'd-3', target: 't-3' } }, // Edge connecting d to t
			{ data: { id: 'et-3', label: 9,  source: 'e-3', target: 't-3' } }, // Edge connecting e to t
			{ data: { id: 'be-3', label: 1,  source: 'b-3', target: 'e-3' } }, // Edge connecting b to e
			{ data: { id: 'fc-3', label: 4,  source: 'f-3', target: 'c-3' } }, // Edge connecting f to c
			{ data: { id: 'fd-3', label: 3,  source: 'f-3', target: 'd-3' } }, // Edge connecting f to d
	
		  ],
		style: [
		{
			selector: 'node',
			style: {
			'background-color': green, // Node color
			'label': 'data(label)', // Display node ID as label
			'text-halign': 'center', // Center the label horizontally
			'text-valign': 'center', // Center the label vertically
			'width': '50px',
			'height': '50px'
			}
		},
		{
			selector: 'edge',
			style: {
			'width': 2, // Edge width
			'line-color': gray, // Edge color
			'curve-style': 'bezier', // Curve style
			'target-arrow-shape': 'triangle', // Arrow shape at the end of the edge
			'label': 'data(label)', // Display node ID as label
			}
		}
		],
		layout: {
		name: 'grid',
		padding: 10,
		rows: 3,
		cols: 3
		}
	});

	cy1.style().selector('#s-1').style({
		'background-color': brown, // Change the background color of node 's-1' to brown
	}).update();

	cy1.style().selector('#t-1').style({
		'background-color': green, // Change the background color of node 's-1' to green
	}).update();

	cy2.style().selector('#s-2').style({
		'background-color': brown, // Change the background color of node 's-1' to brown
	}).update();

	cy2.style().selector('#t-2').style({
		'background-color': green, // Change the background color of node 's-1' to green
	}).update();

	cy3.style().selector('#s-3').style({
		'background-color': brown, // Change the background color of node 's-1' to brown
	}).update();

	cy3.style().selector('#t-3').style({
		'background-color': green, // Change the background color of node 's-1' to green
	}).update();

	cy1.style().selector('edge[source="s-1"]').style({
		'line-color': blue // Change the color of edges with 's-1' as the source to blue
	}).update();

	cy2.style().selector('edge[source="s-2"]').style({
		'line-color': blue // Change the color of edges with 's-1' as the source to blue
	}).update();

	cy3.style().selector('edge[source="s-3"]').style({
		'line-color': blue // Change the color of edges with 's-1' as the source to blue
	}).update();

	const handleNodeClick = (cy, addCutFunc, subCutFunc) => {
        cy.on('click', 'node', function(event) {
            const node = event.target;
            if (node.id() === 't-1' || node.id() === 't-2' || node.id() === 's-1' || node.id() === 's-2' || node.id() === 't-3' || node.id() === 's-3') {
                return;
            }
			const previousNode = node.style('background-color');
			if (previousNode !== brown) {
				node.style('background-color', brown);
				node.outgoers('edge').forEach(function(edge) {
					if (edge.target().style('background-color') !== brown) {
						const prevColor = edge.style('line-color');
						console.log(prevColor);
						if (prevColor === gray) {
							edge.style('line-color', blue);
							addCutFunc(edge.data('label'));
						}
					} // only allow a node and edge to turn brown/blue
					  // if connected to s or connected to brown node connected to s
				});
				node.incomers('edge').forEach(function(edge) {
					const prevColor = edge.style('line-color');
					console.log(prevColor);
					if (prevColor === blue) {
						edge.style('line-color', gray);
						subCutFunc(edge.data('label'));
					}
				});
			} else {
				node.style('background-color', green);
				node.incomers('edge').forEach(function(edge) {
					if (edge.source().style('background-color') === brown) {
						const prevColor = edge.style('line-color');
						if (prevColor === gray) {
							edge.style('line-color', blue);
							addCutFunc(edge.data('label'));
						}
					}
				});
				node.outgoers('edge').forEach(function(edge) {
					const prevColor = edge.style('line-color');
					if (prevColor === blue) {
						edge.style('line-color', gray);
						subCutFunc(edge.data('label'));
					}
				});
			}
        });
    };
	handleNodeClick(cy1, firstCut, firstSubCut);
	handleNodeClick(cy2, secondCut, secondSubCut);
	handleNodeClick(cy3, thirdCut, thirdSubCut);

	switchGraph('cy1', 'first');
});