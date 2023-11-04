function fetchGitHubData() {
    const username = document.getElementById("github-username").value;
    fetch(`https://api.github.com/users/${username}/repos`)
        .then((response) => response.json())
        .then((data) => {
            const contributionsData = data.map((repo) => repo.stargazers_count);

            // Create a Chart.js graph
            const ctx = document.getElementById("contributions-chart").getContext("2d");
            const chart = new Chart(ctx, {
                type: "bar",
                data: {
                    labels: data.map((repo) => repo.name),
                    datasets: [
                        {
                            label: "Contributions",
                            data: contributionsData,
                            backgroundColor: "rgba(75, 192, 192, 0.6)",
                            borderColor: "rgba(75, 192, 192, 1)",
                            borderWidth: 1,
                        },
                    ],
                },
                options: {
                    scales: {
                        y: {
                            beginAtZero: true,
                        },
                    },
                },
            });
        })
        .catch((error) => console.error("Error fetching GitHub data:", error));
}