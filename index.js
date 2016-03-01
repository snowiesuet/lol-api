'use strict'

$( document ).ready(function() {
  console.log('ready')
});
function getSummonerName(summonerId) {
  console.log(summonerId)
  $.ajax({
    url: `https://na.api.pvp.net/api/lol/na/v1.4/summoner/${summonerId}?api_key=6d882760-7427-4ad7-a144-4e9869eacfd1`,
    type: 'GET',
    async: false,
    timeout: 30000,
    success: (basicData => {
      $.each(basicData, function(key, v){
        console.log(v.name)
        return v.name
      })
    }),
      fail: (function( jqxhr, textStatus, error ) {
        var err = textStatus + ", " + error
        console.log( "Request Failed: " + err )
      })
    })
}

function onClick() {
  const summonerName = $("input[name='summonerName']").val();
  console.log(summonerName)
  $.ajax( "https://na.api.pvp.net/api/lol/na/v1.4/summoner/by-name/"+summonerName+"?api_key=6d882760-7427-4ad7-a144-4e9869eacfd1")
    .done(basicData => {
        $.each(basicData, function(key, v) {
          $.ajax( `https://na.api.pvp.net/api/lol/na/v1.3/game/by-summoner/${v.id}/recent/?api_key=6d882760-7427-4ad7-a144-4e9869eacfd1`)
            .done(dataset => {
              console.log(dataset)
              console.log(getSummonerName(v.id));
            })
          console.log(v)
          const summonerId = v.id
          const bannerTemplate =
          `<img src="http://ddragon.leagueoflegends.com/cdn/6.4.1/img/profileicon/${v.profileIconId}.png">
           <h1>${v.name}</h1>
           <h1>${v.summonerLevel}</h1>`
          $('.banner').html(bannerTemplate)
        })
      })
      .fail(function( jqxhr, textStatus, error ) {
        var err = textStatus + ", " + error
        console.log( "Request Failed: " + err )
    });

}

function getRecentMatch() {

}
