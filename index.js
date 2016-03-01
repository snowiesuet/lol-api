'use strict'

$( document ).ready(function() {
  console.log('ready')
});
function getSummonerName(summonerId) {
  console.log(summonerId)
  $.ajax({
    url: `https://na.api.pvp.net/api/lol/na/v1.4/summoner/${summonerId}?api_key=6d882760-7427-4ad7-a144-4e9869eacfd1`,
    type: 'GET',
    timeout: 30000,
    success: (basicData => {
      $.each(basicData, (key, v) => {
        console.log(v.name)
        return v.name
      })
    }),
      fail: (( jqxhr, textStatus, error ) => {
        var err = textStatus + ", " + error
        console.log( "Request Failed: " + err )
      })
    })
}

function onClick() {
  $('.match-history').html('')
  const summonerName = $("input[name='summonerName']").val();
  console.log(summonerName)
  $.ajax( "https://na.api.pvp.net/api/lol/na/v1.4/summoner/by-name/"+summonerName+"?api_key=6d882760-7427-4ad7-a144-4e9869eacfd1")
    .done(basicData => {
        $.each(basicData, function(key, v) {
          // get recent games
          $.ajax(`https://na.api.pvp.net/api/lol/na/v1.3/game/by-summoner/${v.id}/recent/?api_key=6d882760-7427-4ad7-a144-4e9869eacfd1`)
            .done(dataset => {
              console.log(dataset.games)
              $.each(dataset.games, (index, item) => {
                console.log(item)
                const previewTemp =
                `<div class="row">
                    <div class="champion-container">
                      <img class="champion" src="http://ddragon.leagueoflegends.com/cdn/6.4.2/img/champion/Annie.png"></img>
                      <img class="summoner-spells" src="http://ddragon.leagueoflegends.com/cdn/6.4.2/img/spell/SummonerFlash.png"></i>
                      <img class="summoner-spells" src="http://ddragon.leagueoflegends.com/cdn/6.4.2/img/spell/SummonerFlash.png"></i>
                    </div>
                    <div class="game-mode">
                      ${item.gameMode} ${item.gameType}
                    </div>
                    <div class="item-cont"></div>
                </div>`
                $('.match-history').append(previewTemp)
                $.each(item.stats, (index, item) => {
                  console.log(item)
                // const itemTemp =
                // `<img src="http://ddragon.leagueoflegends.com/cdn/6.4.2/img/item/${item.item0}.png"/>
                //   <img src="http://ddragon.leagueoflegends.com/cdn/6.4.2/img/item/${item.item1}.png"/>
                //   <img src="http://ddragon.leagueoflegends.com/cdn/6.4.2/img/item/${item.item2}.png"/>
                //   <img src="http://ddragon.leagueoflegends.com/cdn/6.4.2/img/item/${item.item3}.png"/>
                //   <img src="http://ddragon.leagueoflegends.com/cdn/6.4.2/img/item/${item.item4}.png"/>
                //   <img src="http://ddragon.leagueoflegends.com/cdn/6.4.2/img/item/${item.item5}.png"/>`
                //   $('.item-cont').append(itemTemp)

                })
              })
              console.log(getSummonerName(v.id));
            })
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
