import { useState } from 'react';
import styles from './YearRangePicker.module.css';

const YEARS = [2021, 2022, 2023, 2024];

interface Props {
    isOpen: boolean;
    onClose: () => void;
    onApply: (from: number, to: number) => void;
    defaultRange?: [number, number];
}

export default function YearRangePicker({
                                            isOpen,
                                            onClose,
                                            onApply,
                                            defaultRange = [2021, 2024]
                                        }: Props) {
    const [from, setFrom] = useState(defaultRange[0]);
    const [to, setTo] = useState(defaultRange[1]);

    if (!isOpen) return null; // ничего не рендерим, пока закрыто

    const apply = () => {
        onApply(from, to);
        onClose();
    };

    return (
        <div className={styles.backdrop} onClick={onClose}>
            <div className={styles.modal} onClick={e => e.stopPropagation()}>
                <h3 className={styles.title}>Выберите интервал</h3>

                <div className={styles.row}>
                    <label htmlFor="from">От:</label>
                    <select
                        id="from"
                        value={from}
                        onChange={e => setFrom(+e.target.value)}
                    >
                        {YEARS.map(y => (
                            <option key={y} value={y} disabled={y > to}>
                                {y}
                            </option>
                        ))}
                    </select>
                </div>

                <div className={styles.row}>
                    <label htmlFor="to">До:</label>
                    <select
                        id="to"
                        value={to}
                        onChange={e => setTo(+e.target.value)}
                    >
                        {YEARS.map(y => (
                            <option key={y} value={y} disabled={y < from}>
                                {y}
                            </option>
                        ))}
                    </select>
                </div>

                <button className={styles.okBtn} onClick={apply}>
                    ОК
                </button>
            </div>
        </div>
    );
}