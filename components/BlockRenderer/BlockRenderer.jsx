// "use client";
import { Heading } from "components/Heading";
import { Paragraph } from "components/Paragraph";
import { Cover } from "components/Cover";
import { theme } from "theme";
import { Slider } from "components/Slider/Slider";
import { ImageCustom } from "components/ImageCuston/ImageCustom";
import { Columns } from "components/Columns";
import { Column } from "components/Column";
import { IconBlock } from "components/IconBlock";
import { DividerBlock } from "components/DividerBlock/DividerBlock";
import { Map } from "components/Map";
import { SliderReviews } from "components/SliderReviews";
import { GallerySlider } from "components/GallerySlider";
import { ApartmentsData } from "components/ApartmentsData";
import { ParamsBlock } from "components/ParamsBlock";
import { ContactForm } from "components/ContactForm";
import { MediaText } from "components/MediaText";
import { MediaBlock } from "components/MediaBlock";
import { Carousel } from "components/Carousel";
import { AllApartmentsBlock } from "components/AllApartmentsBlock";
import { GridBlock } from "../GridBlock/GridBlock";
import { ListCustom } from "../ListCustom/ListCustom";
import { LimitWidth } from "../LimitWidth/LimitWidth";
import { ButtonBook } from "../ButtonBook/ButtonBook";

export const BlockRenderer = ({ blocks }) => {

  const objToArray = (data) => {
    const arr = [];
    const slideCount = data.slides;

    for (let i = 0; i < slideCount; i++) {
      const slideIndex = i.toString();
      const slide = {
        image: data[`slides_${slideIndex}_slide_image`],
        link: data[`slides_${slideIndex}_slide_link`],
        link_text: data[`slides_${slideIndex}_slide_link_text`],
        text: data[`slides_${slideIndex}_slide_text`],
        title: data[`slides_${slideIndex}_slide_title`],
      };
      arr.push(slide);
    }

    return arr;
  };

  const objToArrayReviews = (data) => {
    const arr = [];
    const slideCount = data.slides_reviews;
    // console.log("SLIDE COUNT: ", slideCount)

    for (let i = 0; i < slideCount; i++) {
      const slideIndex = i.toString();
      const slide = {
        name: data[`slides_reviews_${slideIndex}_slide_slide_name`],
        flag: data[`slides_reviews_${slideIndex}_slide_slide_flag`],
        country: data[`slides_reviews_${slideIndex}_slide_slide_country`],
        period: data[`slides_reviews_${slideIndex}_slide_slide_period`],
        amountIcon: data[`slides_reviews_${slideIndex}_slide_slide_amount_icon`],
        amountDescription: data[`slides_reviews_${slideIndex}_slide_slide_amount_description`],
        commentGood: data[`slides_reviews_${slideIndex}_slide_slide_comment_good`],
      };
      arr.push(slide);
    }

    return arr;
  }

  const objToArrayGallery = (data) => {
    const arr = [];
    const slideCount = data.gallery;
    // console.log("SLIDE COUNT: ", slideCount)

    for (let i = 0; i < slideCount; i++) {
      const slideIndex = i.toString();
      const slide = {
        image: data[`gallery_${slideIndex}_slide_image`],
        description: data[`gallery_${slideIndex}_slide_description`],
      };
      arr.push(slide);
    }

    return arr;
  }

  const objToArrayCarousel = (data) => {
    const arr = [];
    const slideCount = data.carousel;
    // console.log("SLIDE COUNT: ", slideCount)

    for (let i = 0; i < slideCount; i++) {
      const slideIndex = i.toString();
      const slide = {
        image: data[`carousel_${slideIndex}_slide_image`],
        name: data[`carousel_${slideIndex}_slide_name`],
        distance: data[`carousel_${slideIndex}_slide_distance`],
      };
      arr.push(slide);
    }

    return arr;
  }

  const objToArrayList = (data) => {
    const arr = [];
    const slideCount = data.items;
    // console.log("ARRAY LIST: ", slideCount)

    for (let i = 0; i < slideCount; i++) {
      const slideIndex = i.toString();
      const slide = {
        strongText: data[`items_${slideIndex}_item_strong_text`],
        itemText: data[`items_${slideIndex}_item_item_text`],
      };
      arr.push(slide);
    }

    return arr;
  }

  return blocks.map(block => {
    switch (block.name) {
      case "acf/buttonbook": {
        // console.log("BUTTON BOOK: ", block.attributes);
        return (
          <ButtonBook
            key={block.id}
            label={block.attributes.data.label}
            destination={block.attributes.data.destination}
            align={block.attributes.data.align}
          />
        )
      }
      case "acf/limitwidth": {
        // console.log("LIMIT WIDTH: ", block.attributes);
        return (
          <LimitWidth key={block.id}>
            <BlockRenderer blocks={block.innerBlocks} />
          </LimitWidth>
        )
      }
      case "acf/gridblock": {
        // console.log("GRID BLOCK: ", block.attributes);
        return (
          <GridBlock
            key={block.id}
          >
            <BlockRenderer blocks={block.innerBlocks} />
          </GridBlock>
        )
      }
      case "acf/allapartmentsblock": {
        // console.log("APARTMENTS BLOCK: ", block.attributes);
        return (
          <AllApartmentsBlock
            key={block.id}
          />
        )
      }
      case "acf/googlemap": {
        // console.log("GOOGLE MAP: ", block.attributes.data);
        return (
          <Map
            key={block.id}
            lat={block.attributes.data.google_map.lat}
            lng={block.attributes.data.google_map.lng}
            zoom={block.attributes.data.google_map.zoom}
          />
        )
      }
      case "acf/iconblock": {
        return (
          <IconBlock
            key={block.id}
            background={block.attributes.data.background_color}
            icon={block.attributes.data.icon}
            text={block.attributes.data.text}
            subtext={block.attributes.data.subtext}
          />
        )
      }
      case "acf/dividerblock": {
        return (
          <DividerBlock
            key={block.id}
            background={block.attributes.data.divider_background_color}
            icon={block.attributes.data.divider_icon}
          />
        )
      }
      case "acf/swiperslider": {
        const innerBlocks = objToArray(block.attributes.data, "slides");
        // console.log("SLIDER: ", innerBlocks)
        return (
          <Slider
            key={block.id}
            slides={innerBlocks}
          />
        )
      }
      case "acf/sliderreviews": {
        const innerBlocks = objToArrayReviews(block.attributes.data, "slides_reviews");
        // console.log("SLIDER REVIEWS: ", innerBlocks)
        return (
          <SliderReviews
            key={block.id}
            slides={innerBlocks}
          />
        )
      }
      case "acf/galleryslider": {
        const innerBlocks = objToArrayGallery(block.attributes.data, "gallery");
        // console.log("GALLERY: ", innerBlocks)
        return (
          <GallerySlider
            key={block.id}
            slides={innerBlocks}
          />
        )
      }
      case "acf/carouselblock": {
        const innerBlocks = objToArrayCarousel(block.attributes.data, "carousel");
        // console.log("CAROUSEL: ", innerBlocks);
        return (
          <Carousel
            key={block.id}
            slides={innerBlocks}
          />
        )
      }
      case "acf/listcustom": {
        const innerBlocks = objToArrayList(block.attributes.data, "items");
        // console.log("LIST CUSTOM: ", innerBlocks);
        return (
          <ListCustom
            key={block.id}
            items={innerBlocks}
          />
        )
      }
      case "acf/apartmentdata": {
        // console.log("APARTMENT DATA: ", block.attributes);
        return (
          <ApartmentsData
            key={block.id}
            adress={block.attributes.data.adress}
            area={block.attributes.data.area}
            cost={block.attributes.data.cost}
            floor={block.attributes.data.floor}
            pets={block.attributes.data.pets}
            rooms={block.attributes.data.rooms}
          />
        )
      }
      case "acf/params": {
        // console.log("PARAMS: ", block.attributes);
        return (
          <ParamsBlock
            key={block.id}
            balcony={block.attributes.data.balcony}
            bedrooms={block.attributes.data.bedrooms}
            equipment={block.attributes.data.equipment}
            furniture={block.attributes.data.furniture}
            internet={block.attributes.data.internet}
            parking={block.attributes.data.parking}
            wc={block.attributes.data.wc}
          />
        )
      }
      case "acf/contactform": {
        // console.log("CONTACT FORM: ", block.attributes);
        return (
          <ContactForm
            key={block.id}
          />
        )
      }
      case "acf/mediablock": {
        // console.log("MEDIA BLOCK: ", block.attributes);
        return (
          <MediaBlock
            key={block.id}
            icon={block.attributes.data.icon}
            title={block.attributes.data.title}
            textStart={block.attributes.data.textstart}
            phone={block.attributes.data.phone}
            email={block.attributes.data.email}
            textEnd={block.attributes.data.textend}
            weekdays={block.attributes.data.weekdays}
            weekends={block.attributes.data.weekends}
          />
        )
      }
      case "core/paragraph": {
        // console.log("PARAGRAPH: ", block.attributes);
        const marginTop = block.attributes.style?.spacing?.margin?.top || '0px';
        const marginBottom = block.attributes.style?.spacing?.margin?.bottom || '0px';
        return (
          <Paragraph
            key={block.id}
            content={block.attributes.content}
            textAlign={block.attributes.align}
            fontSize={block.attributes.fontSize}
            textColor={
              theme[block.attributes.textColor] ||
              block.attributes.style?.color?.text
            }
            marginTop={marginTop}
            marginBottom={marginBottom}
          />
        )
      }
      case "core/post-title":
      case "core/heading": {
        // console.log("HEADING: ", block.attributes);
        return (
          <Heading
            key={block.id}
            level={block.attributes.level}
            content={block.attributes.content}
            textAlign={block.attributes.textAlign}
            marginTop={block.attributes.style?.spacing?.margin?.top}
            marginBottom={block.attributes.style?.spacing?.margin?.bottom}
            paddingTop={block.attributes.style?.spacing?.padding?.top}
            paddingBottom={block.attributes.style?.spacing?.padding?.bottom}
            textColor={
              theme[block.attributes.textColor] ||
              block.attributes.style?.color?.text
            }
            backgroundColor={
              theme[block.attributes.backgroundColor] ||
              block.attributes.style?.color?.background
            }
          />
        );
      }
      case 'core/cover': {
        const headingText = block.innerBlocks.find(
          block => block.name === "core/heading"
        )?.attributes?.content;
        // console.log("COVER: ", block.attributes);
        return (
          <Cover
            key={block.id}
            background={block.attributes.url}
            overlayColor={block.attributes.overlayColor}
            overlayOpacity={block.attributes.dimRatio}
            minHeight={block.attributes.minHeight}
            marginTop={block.attributes.style?.spacing?.margin?.top}
            marginBottom={block.attributes.style?.spacing?.margin?.bottom}
            alt={headingText || 'Luft Apartments'}
          >
            <BlockRenderer blocks={block.innerBlocks} />
          </Cover>
        )
      }
      case "core/columns": {
        // console.log("COLUMNS:", block.attributes);
        return (
          <Columns
            key={block.id}
            isStackedOnMobile={block.attributes.isStackedOnMobile}
            align={block.attributes.align}
            textColor={
              theme[block.attributes.textColor] ||
              block.attributes.style?.color?.text
            }
            backgroundColor={
              theme[block.attributes.backgroundColor] ||
              block.attributes.style?.color?.background
            }
            verticalAlignment={block.attributes.verticalAlignment}
            marginTop={block.attributes.style?.spacing?.margin?.top}
            marginBottom={block.attributes.style?.spacing?.margin?.bottom}
            paddingTop={block.attributes.style?.spacing?.padding?.top}
            paddingBottom={block.attributes.style?.spacing?.padding?.bottom}
            gap={block.attributes.style?.spacing?.blockGap?.left}
          >
            <BlockRenderer blocks={block.innerBlocks} />
          </Columns>
        )
      }
      case "core/column": {
        // console.log("COLUMN:", block.attributes);
        return (
          <Column
            key={block.id}
            width={block.attributes.width}
            textColor={
              theme[block.attributes.textColor] ||
              block.attributes.style?.color?.text
            }
            backgroundColor={
              theme[block.attributes.backgroundColor] ||
              block.attributes.style?.color?.background
            }
            paddingTop={block.attributes.style?.spacing?.padding?.top}
            paddingBottom={block.attributes.style?.spacing?.padding?.bottom}
            paddingLeft={block.attributes.style?.spacing?.padding?.left}
            paddingRight={block.attributes.style?.spacing?.padding?.right}
          >
            <BlockRenderer blocks={block.innerBlocks} />
          </Column>
        )
      }
      case "core/image": {
        // console.log("IMAGE:", block.attributes);
        return (
          <ImageCustom
            key={block.id}
            src={block.attributes.url}
            width={block.attributes.width}
            height={block.attributes.height}
            alt={block.attributes.alt || ""}
            align={block.attributes.align}
            href={block.attributes?.href}
          />
        )
      }
      case "core/media-text": {
        return (
          <MediaText
            key={block.id}
            height={block.attributes.height}
            mediaLink={block.attributes.mediaLink}
            verticalAlignment={block.attributes.verticalAlignment}
            mediaPosition={block.attributes.mediaPosition}
            innerBlocks={block.innerBlocks}
          >
            <BlockRenderer blocks={block.innerBlocks} />
          </MediaText>
        )
      }
      default: {
        console.log("UNKNOWN: ", block);
        return null;
      }
    }
  })
}