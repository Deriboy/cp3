let app = new Vue({
  el: '#app',
  data: {
    done: false,
    error: false,
    moveName: '',
    result: {
      moveName: '',
      accuracy: '',
      power: '',
      PP: '',
      moveClass: '',
      type: '',
      flavorText: '',
    },
    magikarp: false,
  },
  methods: {
    submit() {
      console.log("moveName: " + this.moveName);
      
      let moveName = this.moveName;
      
      if (this.moveName === "")
        return;
      
      this.done = false;
      
      moveName = moveName.replace(/ /g,"-");
      moveName = moveName.toLowerCase();
      
      this.magikarp = moveName == 'splash';
      
      var type_url;
      
      axios.get("https://pokeapi.co/api/v2/move/" + moveName)
        .then(json => {
          json = json.data;
          this.result.moveName = json.names[2].name;
          this.result.accuracy = json.accuracy;
          this.result.power = (json.power ? json.power : '-');
          this.result.PP = json.pp;
          this.result.moveClass = json.damage_class.name;
          this.result.flavorText = json.flavor_text_entries[2].flavor_text;
          return json.type.url
        }).then(typeUrl => {
          console.log(typeUrl);
          axios.get(typeUrl)
            .then(json => {
              json = json.data
              this.result.type = json.name;
              this.done = true;
              this.error = false;
            }).catch(error => {
              this.result.type = '';
              this.done = true;
              this.error = true;
            });
        })
        .catch(error => {
          this.result.moveName = '';
          this.result.accuracy = '';
          this.result.power = '';
          this.result.PP = '';
          this.result.moveClass = '';
          this.result.flavorText = '';
          this.done = false;
          this.error = true;
        });
      /*
      const url = "https://pokeapi.co/api/v2/move/" + this.moveName;
      
      fetch(url).then(function(response) {
        return response.json();
      }).then(function(json) {	
        console.log(json);
        
        this.result.moveName = json.names[2].name;
        this.result.accuracy = json.accuracy;
        this.result.power = (json.power ? json.power : '-');
        this.result.PP = json.pp;
        this.result.moveClass = json.damage_class.name;
        this.result.flavorText = json.flavor_text_entries[2].flavor_text;
        return json.type.url
      }).then(function(type_url) {
        fetch(type_url).then(function(response) {
          return response.json();
        }).then(function(json) {	
          console.log(json);
          this.result.type = json.name;
          this.done = true;
        });
      });*/
      
    }
  },
});



/*
document.getElementById("pokeSubmit").addEventListener("click", function(event) {
  event.preventDefault();
  
  var value = document.getElementById("pokeInput").value;
  if (value === "")
    return;
  
  console.log(value);
  
  value = value.replace(" ","-");
  value = value.toLowerCase();
  
  console.log(value);
  
  var type_url;
  
  
  
  const url = "https://pokeapi.co/api/v2/move/" + value;
  
  fetch(url).then(function(response) {
    return response.json();
  }).then(function(json) {	
    console.log(json);
    let results = '<hr/>';
    results += '<h2>' + json.names[2].name + '</h2>';
    results += '<h3>Accuracy: ' + json.accuracy + '</h3>';
    results += '<h3>Power: ' + (json.power ? json.power : '-') + '</h3>';
    results += '<h3>PP: ' + json.pp + '</h3>';
    results += '<h3>Move Class: ' + json.damage_class.name + '</h3>';
    results += '<h3 id="type"></h3>'
    results += '<p>' + json.flavor_text_entries[2].flavor_text + '</p>';
    document.getElementById("pokeResults").innerHTML += results;
    return json.type.url
  }).then(function(type_url) {
    fetch(type_url).then(function(response) {
      return response.json();
    }).then(function(json) {	
      console.log(json);

      document.getElementById("type").innerHTML = 'Type: ' + json.name;
    });
  });
  
  
  
  
});*/