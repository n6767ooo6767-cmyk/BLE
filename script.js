const button = document.getElementById("connect");
const output = document.getElementById("output");

button.onclick = async () => {

    output.textContent = "";

    try {

        const device = await navigator.bluetooth.requestDevice({
            acceptAllDevices: true,
            optionalServices: [
                0x1800,
                0x1801,
                0x180A,
                0x180F
            ]
        });

        print(`📱 Device: ${device.name}`);

        const server = await device.gatt.connect();

        const services = await server.getPrimaryServices();

        for (const service of services) {

            print("");
            print("━━━━━━━━━━━━━━━━━━━━━━");
            print("Service");
            print(service.uuid);

            const characteristics =
                await service.getCharacteristics();

            for (const c of characteristics) {

                print("  ├ UUID:");
                print("  │ " + c.uuid);

                const props = [];

                for (const key in c.properties) {
                    if (c.properties[key])
                        props.push(key);
                }

                print("  └ " + props.join(", "));
                print("");

            }

        }

    } catch (e) {

        print(e);

    }

};

function print(text){
    output.textContent += text + "\n";
}
