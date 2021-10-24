import React, { useEffect, useState } from 'react'
import { View, Text, StyleSheet, ScrollView, Image, TouchableOpacity, TextInput } from 'react-native'
import { CategoryItem, H3, H5, KategoriCard } from '../../../components'
import CovidIcon from '../../../assets/icon/covid.svg'
import EkonomiIcon from '../../../assets/icon/ekonomi.svg'
import PanganIcon from '../../../assets/icon/pangan.svg'
import JasaIcon from '../../../assets/icon/jasa.svg'
import ArrowLeftIcon from '../../../assets/icon/arrow-left.svg'
import SearchIcon from '../../../assets/icon/search.svg'
import { Async } from '../../../utils'
import { HandleGetAllHelps } from '../../../config/redux/action'
import { useDispatch, useSelector } from 'react-redux'

const Kategori = ({ navigation, route }) => {

    const [category, setCategory] = useState(route.params.category)
    const [search, setSearch] = useState('')

    const dispatch = useDispatch()
    const HelpsReducer = useSelector(state => state.Helps)

    useEffect(() => {
        Async.get('token')
            .then(res => {
                dispatch(HandleGetAllHelps(res))
            })

    }, [])

    const searchHelp = (key) => {
        const data = key.toLowerCase();
        let keyword = search.toLowerCase();

        return data.includes(keyword)
    }


    return (
        <ScrollView>
            <View style={{ flex: 1, paddingBottom: 62 }}>
                <View style={{ paddingHorizontal: 30, marginBottom: 32, justifyContent: 'center' }}>
                    <View style={{ flexDirection: 'row', marginTop: 30, alignItems: 'center' }}>
                        <View style={{ width: 30, height: 30 }}>
                            <TouchableOpacity onPress={() => navigation.goBack()}>
                                <ArrowLeftIcon width={30} height={30} />
                            </TouchableOpacity>
                        </View>
                        <H3 title="Kategori" style={{ marginLeft: 40 }} />
                    </View>
                    <View style={[styles.wrapper]}>
                        <CategoryItem onPress={() => setCategory(1)} active={category == 1 ? true : false} title="Covid 19" icon={<CovidIcon />} />
                        <CategoryItem onPress={() => setCategory(2)} active={category == 2 ? true : false} title="Ekonomi" icon={<EkonomiIcon />} />
                        <CategoryItem onPress={() => setCategory(3)} active={category == 3 ? true : false} title="Pangan" icon={<PanganIcon />} />
                        <CategoryItem onPress={() => setCategory(4)} active={category == 4 ? true : false} title="Jasa" icon={<JasaIcon />} />
                    </View>
                    <View style={{ flexDirection: 'row', alignItems: 'center', paddingHorizontal: 10, overflow: 'hidden', height: 59, backgroundColor: 'white', marginTop: 32, borderRadius: 15 }}>
                        <SearchIcon style={{ marginRight: 10 }} />
                        <TextInput value={search} onChangeText={value => setSearch(value)} style={{ width: '90%' }} placeholder='Cari bantuan yang anda butuhkan' />
                    </View>
                </View>
                {HelpsReducer.helps.length > 0 && HelpsReducer.helps.map(item => {
                    if (item.help_category_id == category && searchHelp(item.name)) {
                        return (<KategoriCard navigation={navigation} item={item} />)
                    }
                })}

            </View>
        </ScrollView>


    )
}
const styles = StyleSheet.create({
    wrapper: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 40
    }
})

export default Kategori
