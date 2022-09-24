const channelsContainer = document.querySelector(".channels-type-container");
const channelCount = document.querySelector(".container h2");
const sdChannelsButton = document.querySelector(".sd-channels");
const hdChannelsButton = document.querySelector(".hd-channels");
const allChannelsButton = document.querySelector(".all-channels");
const channelName = document.querySelector(".channel-card h3");
const channelNumber = document.querySelector(".channel-card p");
const card = document.querySelector(".channel-card-container");

const getChannels = async () => {
  try {
    // const response = await fetch("./data/lineup.json");
    const response = await fetch("http://192.168.1.22/lineup.json");
    const data = await response.json();

    const channels = data.map((element) => {
      const channel = {
        name: element.GuideName,
        number: element.GuideNumber,
        hd: element.HD === 1 ? 1 : 0,
      };

      return channel;
    });

    sdChannelsButton.addEventListener("click", () => {
      const sdChannels = channels.filter((element) => element.hd === 0);
      formatChannels(sdChannels);
    });

    hdChannelsButton.addEventListener("click", () => {
      const hdChannels = channels.filter((element) => element.hd === 1);
      formatChannels(hdChannels);
    });

    allChannelsButton.addEventListener("click", () => {
      formatChannels(channels);
    });

    formatChannels(channels);

    return data;
  } catch (error) {
    console.log(error);
  }
};

const formatChannels = (channels) => {
  let html = "";

  channels.forEach((element) => {
    html += `
          <div class="channel-card">
            <h3>${element.name}</h3>
            <p>${element.number}</p>
          </div>
      `;
  });

  card.innerHTML = html;

  channelCount.innerHTML = `Channels (${channels.length})`;
};

getChannels();
