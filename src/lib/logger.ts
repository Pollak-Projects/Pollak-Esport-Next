import { createLogger, format, transports } from 'winston';

const { combine, timestamp, label, printf } = format;

const myFormat = printf(({ level, message, label, timestamp, service, json }) => {
    return `${timestamp} ${label} [${level}] [${service}]: ${message} ${json !== undefined ? '\n'+JSON.stringify(json, null, 2) : ''}`; // LOG FORMAT
});

const devLogger = () => {
    return createLogger({
        level: 'silly',
        // @ts-ignore this is why i dont like js dependencies
        service: `NOT SET`,
        format: combine(
            format.colorize(),
            label({ label: 'dev' }),
            timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
            myFormat
        ),
        transports: [
            new transports.Console() // ONLY PRINTING LOGS IN TERMINAL
        ]
    });
};

const serviceLogger = (serviceName: string) => {
    return devLogger().child({ service: serviceName })
};

export default serviceLogger;