'use client'

import { CalendarPopupData, ViewProps } from '@/types/View'
import { AnimatePresence, motion } from 'motion/react';
import { Pencil, X } from 'lucide-react';
import { useAuthStore, useIsMobile } from '@/hooks/core';
import { useEffect, useState, useCallback } from 'react';
import { toStr } from '@/libs/utils';

type PopupPosition = {
    top: number
    left: number
    direction: 'top' | 'bottom'
}

export default function ScheduleEvent({
    data,
    onClose
}: ViewProps & {
    data: (CalendarPopupData | null),
    onClose: () => void,
}) {
    const item = data?.item;
    const anchorRef = data?.ref;

    const { isLogin } = useAuthStore();
    const isMobile = useIsMobile();
    const [isEdit, setEdit] = useState(data?.isEdit ?? false);
    const [editTitle, setEditTitle] = useState('');
    const [editDesc, setEditDesc] = useState('');
    const [position, setPosition] = useState<PopupPosition | null>(null);

    const handleEdit = () => {
        if (!isEdit) {
            setEditTitle(item?.title ?? '')
            setEditDesc(item?.desc ?? '')
        }
        setEdit(!isEdit)
    };

    const calculatePosition = useCallback((): PopupPosition | null => {
        if (!data || !anchorRef?.current) return null

        const rect = anchorRef.current.getBoundingClientRect()

        const popupWidth = 320
        const popupHeight = 200
        const gap = 12
        const padding = 16
        const sidebarWidth = 160 // 왼쪽 사이드바 너비
        const minLeft = sidebarWidth + padding // 사이드바 + padding

        const spaceBottom = window.innerHeight - rect.bottom
        const spaceTop = rect.top

        const direction =
            spaceBottom >= popupHeight
                ? 'bottom'
                : spaceTop >= popupHeight
                    ? 'top'
                    : 'bottom'

        const top =
            direction === 'bottom'
                ? rect.bottom + gap
                : rect.top - popupHeight - gap

        let left = rect.left + rect.width / 2 - popupWidth / 2

        // 오른쪽 끝 처리 - 여유 있게
        if (left + popupWidth > window.innerWidth - padding) {
            left = window.innerWidth - popupWidth - padding
        }

        // 왼쪽 끝 처리 - 사이드바 영역 피하기
        if (left < minLeft) {
            left = minLeft
        }

        return {
            top,
            left,
            direction,
        }
    }, [data, anchorRef])

    useEffect(() => {
        if (!isMobile) {
            const handleUpdate = () => {
                setPosition(calculatePosition())
            }

            // 팝업이 열릴 때 초기 위치 설정
            handleUpdate()

            window.addEventListener('scroll', handleUpdate, true)
            window.addEventListener('resize', handleUpdate)

            return () => {
                window.removeEventListener('scroll', handleUpdate, true)
                window.removeEventListener('resize', handleUpdate)
            }
        }
    }, [data, anchorRef, isMobile, calculatePosition])

    return (
        <AnimatePresence>
            {item && (
                <>
                    <motion.div
                        className="fixed inset-0 z-40 bg-black/10"
                        onClick={onClose}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                    />

                    <motion.div
                        key={item.id}
                        className={`fixed z-50 bg-white rounded-xl p-4 w-full lg:w-75 lg:h-fit shadow-2xl ${isMobile ? 'bottom-0 left-0 right-0' : ''}`}
                        style={!isMobile && position ? {
                            top: `${position.top}px`,
                            left: `${position.left}px`,
                        } : {}}
                        initial={
                            isMobile ? {
                                y: '100%'
                            } : {
                                opacity: 0,
                                scale: 0.8,
                            }}
                        animate={isMobile ? {
                            y: 0
                        } : {
                            opacity: 1,
                            scale: 1,
                        }}
                        exit={isMobile ? {
                            y: '100%'
                        } : {
                            opacity: 0,
                            scale: 0.8,
                        }}
                        transition={{
                            type: 'spring',
                            stiffness: 300,
                            damping: 25,
                        }}
                        onClick={(e: React.MouseEvent) => e.stopPropagation()}
                    >
                        <div className="flex flex-col gap-2">
                            <div className="flex justify-end items-center gap-1">
                                {isLogin && <button className="cursor-pointer" onClick={handleEdit}><Pencil size={20} /></button>}
                                <button className="cursor-pointer" onClick={onClose}><X size={24} /></button>
                            </div>

                            {isEdit && (
                                <>
                                    <input
                                        type="text"
                                        className="flex-1 px-1 py-1 border-2 border-zinc-200 rounded"
                                        value={editTitle} onChange={(e) => setEditTitle(e.currentTarget.value)} />
                                </>
                            )}
                            {!isEdit && (
                                <>
                                    <div className="flex-1 text-xl truncate">{item.title}</div>
                                    <div className="text-md">
                                        <span>{toStr(item.date, 'MM월 dd일 (EEE)')}</span>
                                        <span>{toStr(item.date, 'HH:mm')}</span>
                                    </div>
                                </>
                            )}

                            <textarea className="resize-none" value={editDesc} onChange={(e) => setEditDesc(e.currentTarget.value)} disabled={!isEdit} />
                            
                        </div>
                    </motion.div >
                </>
            )
            }
        </AnimatePresence >
    )
}