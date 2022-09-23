const channelsContainer = document.querySelector(".my-channels-container");
const channelCount = document.querySelector(".my-channels-container h2");
const hdChannelsButton = document.querySelector(".hd-channels-btn");
const allChannelsButton = document.querySelector(".all-channels-btn");
const channelName = document.querySelector(".channel-card h4");
const channelNumber = document.querySelector(".channel-card p");
const card = document.querySelector(".channel-container");

const getChannels = async () => {
  const response = await fetch("./data/lineup.json");
  const data = await response.json();

  const channels = data.map((element) => {
    const channel = {
      name: element.GuideName,
      number: element.GuideNumber,
      hd: element.HD,
    };

    return channel;
  });

  hdChannelsButton.addEventListener("click", () => {
    const hdChannels = channels.filter((element) => element.hd === 1);
    formatChannels(hdChannels);
  });

  allChannelsButton.addEventListener("click", () => {
    formatChannels(channels);
  });

  formatChannels(channels);
};

const formatChannels = (channels) => {
  let html = "";

  channels.forEach((element) => {
    html += `
          <div class="channel-card">
            <h4>${element.name}</h4>
            <p>${element.number}</p>
          </div>
      `;
  });

  card.innerHTML = html;

  channelCount.innerHTML = `Channels (${channels.length})`;
};

getChannels();
